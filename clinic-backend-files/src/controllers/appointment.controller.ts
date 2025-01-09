import { Controller, Get, Post, Put, Delete, Param, Body, Query }
    from '@nestjs/common';
import { AppointmentService } from 'src/services/appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentStatus } from 'src/enums/appointment.enum';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    // Create: Add a new appointment
    @Post()
    async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        return this.appointmentService.create(createAppointmentDto);
    }

    // Read: Get all appointments with optional filters
    @Get()
    async findAll(
        @Query('id') id?: number,
        @Query('status') status?: AppointmentStatus,
        @Query('doc_id') doc_id?: number,
        @Query('patient_id') patient_id?: number,
    ): Promise<Appointment[]> {
        const filterParams: { id?: number; status?: string; doc_id?: number; patient_id?: number } = {};

        if (id) filterParams.id = id;
        if (status) filterParams.status = status;
        if (doc_id) filterParams.doc_id = doc_id;
        if (patient_id) filterParams.patient_id = patient_id;

        return this.appointmentService.findAppointments(filterParams);
    }

    // Read: Get a specific appointment by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Appointment> {
        return this.appointmentService.findOne(id);
    }

    // Update: Update an appointment's details
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ): Promise<Appointment> {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    // Delete: Remove an appointment
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.appointmentService.remove(id);
    }
}
