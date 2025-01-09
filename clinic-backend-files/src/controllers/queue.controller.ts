// src/queue/queue.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Put } from '@nestjs/common';
import { QueueService } from '../services/queue.service';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { UpdateQueueDto } from '../dto/update-queue.dto';
import { Queue } from '../entities/queue.entity';
import { QueueProgress, QueueStatus } from 'src/enums/queue.enum';

@Controller('queue')
export class QueueController {
    constructor(private readonly queueService: QueueService) { }

    // Create a new queue entry
    @Post()
    async create(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
        return this.queueService.create(createQueueDto);
    }

    // Fetch all queue entries, optionally filtering by status
    @Get()
    async findAll(@Query('id') id, @Query('status') status?: QueueStatus, @Query('progress') progress?: QueueProgress, @Query('priority') priority?: number): Promise<Queue[]> {
        return this.queueService.findAll(id, status, progress, priority);
    }

    // Fetch a specific queue entry by its ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Queue> {
        return this.queueService.findOne(id);
    }

    // Update a specific queue entry
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateQueueDto: UpdateQueueDto): Promise<Queue> {
        return this.queueService.update(id, updateQueueDto);
    }

    // Delete a specific queue entry
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.queueService.remove(id);
    }
}
