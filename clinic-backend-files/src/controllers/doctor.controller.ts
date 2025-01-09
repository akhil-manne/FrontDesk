import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { DoctorService } from 'src/services/doctor.service';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { Doctor } from '../entities/doctor.entity';
import { DoctorStatus } from 'src/enums/doctor.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }

    @Get() // Default method to handle GET requests to '/doctor'
    async findAll(
        @Query('id') id?: number,
        @Query('status') status?: DoctorStatus,
        @Query('specialization') specialization?: string,
        @Query('location') location?: string,
        @Query('availability') availability?: Date,
    ): Promise<Doctor[]> {
        // Handle parameters from the query and pass them to the service
        return this.doctorService.findAll(id, status, specialization, location, availability);
    }

    @Get(':id')  // Define the ID param in the URL
    async findOne(@Param('id') id: number) {
        return await this.doctorService.findOne(id);  // Call the service method to fetch the doctor by ID
    }

    // Create: Add a new doctor
    @Post()
    async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        return this.doctorService.create(createDoctorDto);
    }

    // Update: Update a doctor's details
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
        return this.doctorService.update(id, updateDoctorDto);
    }

    // Delete: Remove a doctor
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.doctorService.remove(id);
    }
}
