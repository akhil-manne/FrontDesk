// src/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity'; // Doctor entity for relationship
import { Queue } from './queue.entity'; // Queue entity for patient relationship
import { AppointmentStatus } from 'src/enums/appointment.enum'; // AppointmentStatus enum (custom enum for status)

@Entity('Appointments') // Explicitly set table name to match your SQL
export class Appointment {
    @PrimaryGeneratedColumn({ name: 'app_id' }) // Matches the app_id column from SQL
    app_id: number; // Primary Key for Appointment (app_id)

    @ManyToOne(() => Queue, patient => (patient.appointments), { eager: true }) // Many-to-one relationship with Queue for patient
    @JoinColumn({ name: 'patient_id' })
    patient: Queue["q_id"]; // Patient linked to the Queue

    @ManyToOne(() => Doctor, doctor => (doctor.appointments), { eager: true }) // Many-to-one relationship with Doctor
    @JoinColumn({ name: 'doc_id' })
    doctor: Doctor["doc_id"]; // Doctor related to the appointment

    @Column({
        type: 'timestamp',
        name: 'app_time', // Matches the column name 'app_time' in the SQL
        nullable: false,
    })
    app_time: Date; // Appointment time (timestamp with both date and time)

    @Column({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.Booked, // Default value is 'booked'
        name: 'app_status', // Matches 'app_status' column name from SQL
    })
    app_status: AppointmentStatus; // Status of the appointment

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date; // Created timestamp

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', // Automatically sets the updated timestamp
    })
    updated_at: Date; // Updated timestamp
}
