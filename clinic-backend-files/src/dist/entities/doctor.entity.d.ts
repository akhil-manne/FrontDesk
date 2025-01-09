import { Appointment } from './appointment.entity';
import { DoctorStatus } from 'src/enums/doctor.enum';
export declare class Doctor {
    doc_id: number;
    doc_name: string;
    specialization: string;
    appointments: Appointment[];
    gender: 'M' | 'F';
    location: string;
    next_available: Date | null;
    doc_status: DoctorStatus;
    created_at: Date;
    updated_at: Date;
}
