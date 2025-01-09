import { Doctor } from './doctor.entity';
import { Queue } from './queue.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';
export declare class Appointment {
    app_id: number;
    patient: Queue["q_id"];
    doctor: Doctor["doc_id"];
    app_time: Date;
    app_status: AppointmentStatus;
    created_at: Date;
    updated_at: Date;
}
