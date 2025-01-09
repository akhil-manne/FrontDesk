// src/appointment/appointment.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentStatus } from 'src/enums/appointment.enum';
import { Queue } from 'src/entities/queue.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { filter } from 'rxjs';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectRepository(Queue)  // Inject Queue repository
        private queueRepository: Repository<Queue>,

        @InjectRepository(Doctor)  // Inject Doctor repository
        private doctorRepository: Repository<Doctor>,
    ) { }

    async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const patientId = createAppointmentDto.patient_id;
        const doctorId = createAppointmentDto.doc_id;
        const appointmentTime = createAppointmentDto.app_time;
        const appointmentStatus = createAppointmentDto.app_status ?? 'booked';

        // Validate Patient
        const queueRecord = await this.queueRepository.findOne({ where: { q_id: patientId } });
        if (!queueRecord) {
            throw new HttpException(`Patient with id ${patientId} does not exist in the queue.`, HttpStatus.BAD_REQUEST);
        }

        // Validate Doctor
        const doctorRecord = await this.doctorRepository.findOne({ where: { doc_id: doctorId } });
        if (!doctorRecord) {
            throw new HttpException(`Doctor with id ${doctorId} does not exist.`, HttpStatus.BAD_REQUEST);
        }

        // Use raw SQL for insertion
        const query = `
            INSERT INTO Appointments (patient_id, doc_id, app_time, app_status, created_at, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;

        // Execute query
        try {
            await this.appointmentRepository.query(query, [
                patientId,
                doctorId,
                appointmentTime,
                appointmentStatus,
            ]);

            // Return created appointment for confirmation
            const [createdAppointment] = await this.appointmentRepository.query(
                `SELECT * FROM Appointments WHERE patient_id = ? AND doc_id = ? AND app_time = ?`,
                [patientId, doctorId, appointmentTime],
            );

            return createdAppointment;
        } catch (error) {
            console.error('Error creating appointment:', error.message);
            throw new HttpException('Failed to create appointment', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Find an appointment by its ID
    async findOne(id: number): Promise<Appointment> {
        return this.appointmentRepository.findOne({
            where: { app_id: id },
        });
    }

    async findAppointments(filterParams: { id?: number, status?: string; doc_id?: number; patient_id?: number }): Promise<Appointment[]> {
        const queryBuilder = this.appointmentRepository.createQueryBuilder('appointments')
            .leftJoinAndSelect('appointments.patient', 'queue')    // 'patient' here refers to 'queue'
            .leftJoinAndSelect('appointments.doctor', 'doctor');   // 'doctor' refers to the Doctor entity

        if (filterParams.id) {
            queryBuilder.andWhere('appointments.app_id = :id', { id: filterParams.id });
        }

        if (filterParams.status) {
            queryBuilder.andWhere('appointments.app_status = :status', { status: filterParams.status });
        }

        if (filterParams.doc_id) {
            queryBuilder.andWhere('appointments.doc_id = :doc_id', { doc_id: filterParams.doc_id });
        }

        if (filterParams.patient_id) {
            queryBuilder.andWhere('appointments.patient_id = :patient_id', { patient_id: filterParams.patient_id });
        }

        return queryBuilder.getMany();
    }

    // Update an appointment
    // async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    //     await this.appointmentRepository.update(id, updateAppointmentDto);
    //     return this.findOne(id);
    // }

    async update(app_id: number, updateData: UpdateAppointmentDto): Promise<Appointment> {
        const { patient_id, doc_id, app_time, app_status } = updateData;

        // Check if the appointment exists
        const existingAppointment = await this.appointmentRepository.query(
            `SELECT * FROM Appointments WHERE app_id = ?`,
            [app_id],
        );

        if (existingAppointment.length === 0) {
            throw new HttpException(`Appointment with id ${app_id} does not exist.`, HttpStatus.NOT_FOUND);
        }

        // Validate patient_id if provided
        if (patient_id) {
            const queueRecord = await this.queueRepository.findOne({ where: { q_id: patient_id } });
            if (!queueRecord) {
                throw new HttpException(`Patient with id ${patient_id} does not exist in the queue.`, HttpStatus.BAD_REQUEST);
            }
        }

        // Validate doc_id if provided
        if (doc_id) {
            const doctorRecord = await this.doctorRepository.findOne({ where: { doc_id } });
            if (!doctorRecord) {
                throw new HttpException(`Doctor with id ${doc_id} does not exist.`, HttpStatus.BAD_REQUEST);
            }
        }

        // Build the dynamic update query
        const updateQuery = `
        UPDATE Appointments
        SET 
            ${patient_id ? 'patient_id = ?,' : ''}
            ${doc_id ? 'doc_id = ?,' : ''}
            ${app_time ? 'app_time = ?,' : ''}
            ${app_status ? 'app_status = ?,' : ''}
            updated_at = CURRENT_TIMESTAMP
        WHERE app_id = ?;
    `;

        // Collect dynamic values for placeholders
        const updateValues: any[] = [];
        if (patient_id) updateValues.push(patient_id);
        if (doc_id) updateValues.push(doc_id);
        if (app_time) updateValues.push(app_time);
        if (app_status) updateValues.push(app_status);
        updateValues.push(app_id); // App ID for WHERE clause

        // Execute the query
        try {
            await this.appointmentRepository.query(updateQuery, updateValues);

            // Return updated appointment
            const [updatedAppointment] = await this.appointmentRepository.query(
                `SELECT * FROM Appointments WHERE app_id = ?`,
                [app_id],
            );

            return updatedAppointment;
        } catch (error) {
            console.error('Error updating appointment:', error.message);
            throw new HttpException('Failed to update appointment', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // Cancel an appointment by updating its status
    async cancel(id: number): Promise<Appointment> {
        await this.appointmentRepository.update(id, { app_status: AppointmentStatus.Canceled });
        return this.findOne(id);
    }

    async book(id: number): Promise<Appointment> {
        await this.appointmentRepository.update(id, { app_status: AppointmentStatus.Booked });
        return this.findOne(id);
    }

    async complete(id: number): Promise<Appointment> {
        await this.appointmentRepository.update(id, { app_status: AppointmentStatus.Completed });
        return this.findOne(id);
    }

    // Delete an appointment
    async remove(id: number): Promise<void> {
        await this.appointmentRepository.delete(id);
    }
}
