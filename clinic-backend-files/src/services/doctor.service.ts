import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { DoctorStatus } from 'src/enums/doctor.enum';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository: Repository<Doctor>,
    ) { }

    // Create a new doctor
    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = this.doctorRepository.create(createDoctorDto);
        return this.doctorRepository.save(doctor);
    }

    // Get a doctor by ID
    async findOne(doc_id: number): Promise<Doctor> {
        return this.doctorRepository.findOne({ where: { doc_id } });
    }

    // Get all doctors with optional filters for active status
    async findAll(
        id?: number,
        status?: DoctorStatus,
        specialization?: string,
        location?: string,
        nextAvailable?: Date,
    ): Promise<Doctor[]> {
        const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');

        if (id) {
            queryBuilder.andWhere('doctor.doc_id = :id', { id });
        }

        if (status) {
            queryBuilder.andWhere('doctor.doc_status = :status', { status });
        }

        if (specialization) {
            queryBuilder.andWhere('doctor.specialization LIKE :specialization', { specialization: `%${specialization}%` });
        }

        if (location) {
            queryBuilder.andWhere('doctor.location LIKE :location', { location: `%${location}%` });
        }

        if (nextAvailable) {
            queryBuilder.andWhere('doctor.next_available <= :nextAvailable', { nextAvailable });
        }

        return queryBuilder.getMany();
    }


    // Update a doctor's details
    async update(doc_id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
        await this.doctorRepository.update(doc_id, updateDoctorDto);
        return this.findOne(doc_id);
    }

    // Delete a doctor by ID
    async remove(id: number): Promise<void> {
        await this.doctorRepository.delete(id);
    }
}
