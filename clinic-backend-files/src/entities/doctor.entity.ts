// src/entities/doctor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity'; // Assuming doctor is related to appointments
import { DoctorStatus } from 'src/enums/doctor.enum'; // Adjust to the actual location of your enum

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    doc_id: number;

    @Column()
    doc_name: string; // Doctor's name

    @Column()
    specialization: string; // Doctor's specialization

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];

    @Column({
        type: 'enum',
        enum: ['M', 'F'],
    })
    gender: 'M' | 'F'; // Gender ('M' or 'F')

    @Column()
    location: string; // Doctor's location

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    next_available: Date | null; // Doctor's next available time, optional

    @Column({
        type: 'enum',
        enum: DoctorStatus,
        default: DoctorStatus.Available, // Default status if not provided
    })
    doc_status: DoctorStatus; // Doctor's current status (available, busy, off-duty)

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', // Automatically sets the created timestamp
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', // Automatically sets the updated timestamp
    })
    updated_at: Date;
}
