import { QueueStatus, QueueProgress } from '../enums/queue.enum';
export declare class UpdateQueueDto {
    patient_name?: string;
    queue_status?: QueueStatus;
    queue_progress?: QueueProgress;
    priority_num?: number;
}
