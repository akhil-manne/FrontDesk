// src/dto/create-doctor.dto.ts
import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { DoctorStatus } from '../enums/doctor.enum'; // Assuming DoctorStatus enum is in the queue.enum.ts

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    doc_name: string; // Doctor's name (required)

    @IsString()
    @IsNotEmpty()
    specialization: string; // Specialization (required)

    @IsEnum(['M', 'F'])
    gender: 'M' | 'F'; // Gender (required; assuming 'M' and 'F' values based on your doc schema)

    @IsString()
    @IsNotEmpty()
    location: string; // Location (required)

    @IsOptional()
    next_available: string; // Optional field for doctor's next available time

    @IsEnum(DoctorStatus)
    @IsOptional()
    doc_status?: DoctorStatus;  // Use enum value directly
}
