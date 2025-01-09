import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'; // Add this line
import { DoctorModule } from './modules/doctor.module';
import { QueueModule } from './modules/queue.module';
import { AppointmentModule } from './modules/appointment.module';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from './entities/doctor.entity';
import { Queue } from './entities/queue.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'clinic_db',
      entities: [Appointment, Doctor, Queue],
      driver: require('mysql2'),
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    DoctorModule,
    QueueModule,
    AppointmentModule,
  ],
})
export class AppModule { }
