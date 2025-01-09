import { Repository } from 'typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { DoctorStatus } from 'src/enums/doctor.enum';
export declare class DoctorService {
    private doctorRepository;
    constructor(doctorRepository: Repository<Doctor>);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findOne(doc_id: number): Promise<Doctor>;
    findAll(id?: number, status?: DoctorStatus, specialization?: string, location?: string, nextAvailable?: Date): Promise<Doctor[]>;
    update(doc_id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
