"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
const appointment_enum_1 = require("../enums/appointment.enum");
const queue_entity_1 = require("../entities/queue.entity");
const doctor_entity_1 = require("../entities/doctor.entity");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, queueRepository, doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.queueRepository = queueRepository;
        this.doctorRepository = doctorRepository;
    }
    async create(createAppointmentDto) {
        const patientId = createAppointmentDto.patient_id;
        const doctorId = createAppointmentDto.doc_id;
        const appointmentTime = createAppointmentDto.app_time;
        const appointmentStatus = createAppointmentDto.app_status ?? 'booked';
        const queueRecord = await this.queueRepository.findOne({ where: { q_id: patientId } });
        if (!queueRecord) {
            throw new common_1.HttpException(`Patient with id ${patientId} does not exist in the queue.`, common_1.HttpStatus.BAD_REQUEST);
        }
        const doctorRecord = await this.doctorRepository.findOne({ where: { doc_id: doctorId } });
        if (!doctorRecord) {
            throw new common_1.HttpException(`Doctor with id ${doctorId} does not exist.`, common_1.HttpStatus.BAD_REQUEST);
        }
        const query = `
            INSERT INTO Appointments (patient_id, doc_id, app_time, app_status, created_at, updated_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
        try {
            await this.appointmentRepository.query(query, [
                patientId,
                doctorId,
                appointmentTime,
                appointmentStatus,
            ]);
            const [createdAppointment] = await this.appointmentRepository.query(`SELECT * FROM Appointments WHERE patient_id = ? AND doc_id = ? AND app_time = ?`, [patientId, doctorId, appointmentTime]);
            return createdAppointment;
        }
        catch (error) {
            console.error('Error creating appointment:', error.message);
            throw new common_1.HttpException('Failed to create appointment', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        return this.appointmentRepository.findOne({
            where: { app_id: id },
        });
    }
    async findAppointments(filterParams) {
        const queryBuilder = this.appointmentRepository.createQueryBuilder('appointments')
            .leftJoinAndSelect('appointments.patient', 'queue')
            .leftJoinAndSelect('appointments.doctor', 'doctor');
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
    async update(app_id, updateData) {
        const { patient_id, doc_id, app_time, app_status } = updateData;
        const existingAppointment = await this.appointmentRepository.query(`SELECT * FROM Appointments WHERE app_id = ?`, [app_id]);
        if (existingAppointment.length === 0) {
            throw new common_1.HttpException(`Appointment with id ${app_id} does not exist.`, common_1.HttpStatus.NOT_FOUND);
        }
        if (patient_id) {
            const queueRecord = await this.queueRepository.findOne({ where: { q_id: patient_id } });
            if (!queueRecord) {
                throw new common_1.HttpException(`Patient with id ${patient_id} does not exist in the queue.`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (doc_id) {
            const doctorRecord = await this.doctorRepository.findOne({ where: { doc_id } });
            if (!doctorRecord) {
                throw new common_1.HttpException(`Doctor with id ${doc_id} does not exist.`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
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
        const updateValues = [];
        if (patient_id)
            updateValues.push(patient_id);
        if (doc_id)
            updateValues.push(doc_id);
        if (app_time)
            updateValues.push(app_time);
        if (app_status)
            updateValues.push(app_status);
        updateValues.push(app_id);
        try {
            await this.appointmentRepository.query(updateQuery, updateValues);
            const [updatedAppointment] = await this.appointmentRepository.query(`SELECT * FROM Appointments WHERE app_id = ?`, [app_id]);
            return updatedAppointment;
        }
        catch (error) {
            console.error('Error updating appointment:', error.message);
            throw new common_1.HttpException('Failed to update appointment', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async cancel(id) {
        await this.appointmentRepository.update(id, { app_status: appointment_enum_1.AppointmentStatus.Canceled });
        return this.findOne(id);
    }
    async book(id) {
        await this.appointmentRepository.update(id, { app_status: appointment_enum_1.AppointmentStatus.Booked });
        return this.findOne(id);
    }
    async complete(id) {
        await this.appointmentRepository.update(id, { app_status: appointment_enum_1.AppointmentStatus.Completed });
        return this.findOne(id);
    }
    async remove(id) {
        await this.appointmentRepository.delete(id);
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(queue_entity_1.Queue)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map