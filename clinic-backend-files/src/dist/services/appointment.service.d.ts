import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Queue } from 'src/entities/queue.entity';
import { Doctor } from 'src/entities/doctor.entity';
export declare class AppointmentService {
    private appointmentRepository;
    private queueRepository;
    private doctorRepository;
    constructor(appointmentRepository: Repository<Appointment>, queueRepository: Repository<Queue>, doctorRepository: Repository<Doctor>);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findOne(id: number): Promise<Appointment>;
    findAppointments(filterParams: {
        id?: number;
        status?: string;
        doc_id?: number;
        patient_id?: number;
    }): Promise<Appointment[]>;
    update(app_id: number, updateData: UpdateAppointmentDto): Promise<Appointment>;
    cancel(id: number): Promise<Appointment>;
    book(id: number): Promise<Appointment>;
    complete(id: number): Promise<Appointment>;
    remove(id: number): Promise<void>;
}
