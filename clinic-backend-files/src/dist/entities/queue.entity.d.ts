import { Appointment } from './appointment.entity';
import { QueueStatus, QueueProgress } from 'src/enums/queue.enum';
export declare class Queue {
    q_id: number;
    patient_name: string;
    queue_status: QueueStatus;
    queue_progress: QueueProgress;
    priority_num: number;
    wait_time?: number;
    appointments: Appointment[];
    created_at: Date;
    updated_at: Date;
}
