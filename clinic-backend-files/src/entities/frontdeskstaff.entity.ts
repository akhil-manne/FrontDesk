// src/entities/frontdeskstaff.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('frontdeskstaff') // Make sure it's correct
export class FrontDeskStaff {
    @PrimaryGeneratedColumn()
    staff_id: number;

    @Column()
    staff_username: string;

    @Column()
    staff_password: string;  // You need this field to store the password (in plain text or hashed)
}
