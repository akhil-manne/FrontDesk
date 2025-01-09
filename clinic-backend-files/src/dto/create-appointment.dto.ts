// src/dto/create-appointment.dto.ts
import { IsInt, IsEnum, IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Doctor } from 'src/entities/doctor.entity';
import { Queue } from 'src/entities/queue.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';  // Assuming AppointmentStatus enum is defined in your appointment.enum.ts

export class CreateAppointmentDto {
    @IsInt()
    @IsNotEmpty()
    patient_id: Queue["q_id"];  // References the patient in the Queue (required)

    @IsInt()
    @IsNotEmpty()
    doc_id: Doctor["doc_id"];  // References the doctor (required)

    @IsDate()
    @IsNotEmpty()
    app_time: Date;  // The appointment time (required)

    @IsEnum(AppointmentStatus)
    @IsOptional()
    app_status: AppointmentStatus = AppointmentStatus.Booked;  // Default to 'booked' if not provided

    // No need for 'created_at' and 'updated_at' as those are handled by DB triggers.
}
