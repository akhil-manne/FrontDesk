import { IsString, IsOptional, IsEnum } from 'class-validator';
import { DoctorStatus } from '../enums/doctor.enum'; // Assuming you are importing the DoctorStatus enum

export class UpdateDoctorDto {
    @IsString()
    @IsOptional() // Make the name optional for updating
    doc_name?: string;

    @IsString()
    @IsOptional() // Make specialization optional for updating
    specialization?: string;

    @IsString()
    @IsOptional() // Make location optional for updating
    location?: string;

    @IsOptional()
    next_available?: Date;

    @IsEnum(DoctorStatus)
    @IsOptional() // Make doc_status optional for updating
    doc_status?: DoctorStatus;
}
