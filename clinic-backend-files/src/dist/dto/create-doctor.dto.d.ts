import { DoctorStatus } from '../enums/doctor.enum';
export declare class CreateDoctorDto {
    doc_name: string;
    specialization: string;
    gender: 'M' | 'F';
    location: string;
    next_available: string;
    doc_status?: DoctorStatus;
}
