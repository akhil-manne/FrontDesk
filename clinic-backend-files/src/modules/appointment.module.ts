import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointment.controller';
import { AppointmentService } from 'src/services/appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { Queue } from '../entities/queue.entity';
import { Doctor } from '../entities/doctor.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, Queue, Doctor]), // Import Appointment, Queue, and Doctor entities for TypeORM
    ],
    controllers: [AppointmentController], // Register AppointmentController to manage incoming requests
    providers: [AppointmentService, JwtAuthGuard], // Register AppointmentService for business logic
    exports: [AppointmentService], // Export AppointmentService if other modules need it
})
export class AppointmentModule { }
