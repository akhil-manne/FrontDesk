import { AppointmentStatus } from 'src/enums/appointment.enum';
export declare class UpdateAppointmentDto {
    patient_id?: number;
    doc_id?: number;
    app_time?: Date;
    app_status?: AppointmentStatus;
}
