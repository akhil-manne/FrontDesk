import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from 'src/controllers/doctor.controller';
import { DoctorService } from 'src/services/doctor.service';
import { Doctor } from '../entities/doctor.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor])], // Import Doctor entity for TypeORM
    controllers: [DoctorController], // Register DoctorController to handle incoming requests
    providers: [DoctorService, JwtAuthGuard], // Register DoctorService for business logic
    exports: [DoctorService], // Export DoctorService if other modules need it
})
export class DoctorModule { }
