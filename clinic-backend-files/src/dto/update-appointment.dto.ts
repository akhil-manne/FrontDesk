// src/dto/update-appointment.dto.ts
import { IsOptional, IsInt, IsEnum, IsDate, IsNotEmpty, IsInstance } from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentStatus } from 'src/enums/appointment.enum'; // Ensure correct import of the enum
import { DoctorStatus } from 'src/enums/doctor.enum'; // Assuming DoctorStatus enum is available

export class UpdateAppointmentDto {
    @IsOptional()
    @IsInt()
    patient_id?: number;

    @IsOptional()
    @IsInt()
    doc_id?: number;

    @IsOptional()
    @IsInstance(Date) // Ensure the value is a JavaScript Date instance
    @IsDate()
    @Type(() => Date) // Transform plain string to Date object automatically
    app_time?: Date; // Should be a JavaScript Date object for date and time compatibility with TIMESTAMP

    @IsOptional()
    @IsEnum(AppointmentStatus)
    app_status?: AppointmentStatus; // Status of the appointment (e.g., booked, completed, canceled)
}