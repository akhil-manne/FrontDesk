import { Doctor } from 'src/entities/doctor.entity';
import { Queue } from 'src/entities/queue.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';
export declare class CreateAppointmentDto {
    patient_id: Queue["q_id"];
    doc_id: Doctor["doc_id"];
    app_time: Date;
    app_status: AppointmentStatus;
}
