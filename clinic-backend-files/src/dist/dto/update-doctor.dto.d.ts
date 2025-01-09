import { DoctorStatus } from '../enums/doctor.enum';
export declare class UpdateDoctorDto {
    doc_name?: string;
    specialization?: string;
    location?: string;
    next_available?: Date;
    doc_status?: DoctorStatus;
}
