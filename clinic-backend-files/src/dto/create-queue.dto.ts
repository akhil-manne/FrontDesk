// src/dto/create-queue.dto.ts
import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { QueueStatus, QueueProgress } from 'src/enums/queue.enum'; // Ensure this is properly imported

export class CreateQueueDto {
    @IsString()
    patient_name: string;

    @IsEnum(QueueStatus)
    queue_status: QueueStatus;

    // @IsEnum(QueueProgress)
    // @IsOptional()
    // queue_progress: QueueProgress;

    @IsInt()
    @IsOptional()
    priority_num: number;  // No @Min, allowing any integer

    // @IsInt()
    // wait_time: number;  // Likely managed by triggers in your DB

    // Created_at and updated_at are handled by DB triggers and defaults, so no need here
}