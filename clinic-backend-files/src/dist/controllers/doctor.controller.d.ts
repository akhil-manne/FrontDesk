import { DoctorService } from 'src/services/doctor.service';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { Doctor } from '../entities/doctor.entity';
import { DoctorStatus } from 'src/enums/doctor.enum';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    findAll(id?: number, status?: DoctorStatus, specialization?: string, location?: string, availability?: Date): Promise<Doctor[]>;
    findOne(id: number): Promise<Doctor>;
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    remove(id: number): Promise<void>;
}
