// src/entities/queue.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity'; // Assuming you want to associate an appointment with the queue, modify as needed
import { QueueStatus, QueueProgress } from 'src/enums/queue.enum'; // Adjust based on your enum locations

@Entity()
export class Queue {
    @PrimaryGeneratedColumn()
    q_id: number;

    @Column()
    patient_name: string;

    @Column({
        type: 'enum',
        enum: QueueStatus,
        default: QueueStatus.Normal,  // Default status if not provided
    })
    queue_status: QueueStatus;

    @Column({
        type: 'enum',
        enum: QueueProgress,
        nullable: true,
        default: QueueProgress.Waiting,  // Default value null for progress status
    })
    queue_progress: QueueProgress;

    @Column({
        type: 'int',
        default: 0,  // Default value 0 for priority number if not provided
    })
    priority_num: number;

    @Column({
        type: 'int',
        nullable: true, // Assuming you want wait_time to be optional
    })
    wait_time?: number;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',  // Automatically set timestamp for created_at
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP', // Automatically set timestamp for updated_at
    })
    updated_at: Date;
}
