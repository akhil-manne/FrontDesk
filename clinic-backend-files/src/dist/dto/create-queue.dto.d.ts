import { QueueStatus } from 'src/enums/queue.enum';
export declare class CreateQueueDto {
    patient_name: string;
    queue_status: QueueStatus;
    priority_num: number;
}
