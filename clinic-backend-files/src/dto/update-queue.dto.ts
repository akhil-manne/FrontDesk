// src/dto/update-queue.dto.ts
import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { QueueStatus, QueueProgress } from '../enums/queue.enum'; // Ensure correct import of enums

export class UpdateQueueDto {
    @IsOptional()
    @IsString()
    patient_name?: string;  // Make optional, as we might not want to change patient name

    @IsOptional()
    @IsEnum(QueueStatus)
    queue_status?: QueueStatus;  // Allow optional update for queue_status

    @IsOptional()
    @IsEnum(QueueProgress)
    queue_progress?: QueueProgress;  // Allow optional update for queue_progress

    @IsOptional()
    @IsInt()
    priority_num?: number;  // Allow optional update for priority_num

    // @IsOptional()
    // @IsInt()
    // wait_time?: number;  // Allow optional update for wait_time
}
