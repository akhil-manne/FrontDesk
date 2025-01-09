import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { UpdateQueueDto } from '../dto/update-queue.dto';
import { Queue } from '../entities/queue.entity';
import { QueueStatus, QueueProgress } from '../enums/queue.enum';
import { queue } from 'rxjs';

@Injectable()
export class QueueService {
    constructor(
        @InjectRepository(Queue)
        private queueRepository: Repository<Queue>,
    ) { }

    // Create a new queue entry
    // async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    //     const newQueue = this.queueRepository.create(createQueueDto);
    //     return this.queueRepository.save(newQueue);
    // }

    // In queue.service.ts (or wherever you're handling the Queue entry)

    // In queue.service.ts (corrected)

    async create(createQueueDto: CreateQueueDto): Promise<Queue> {
        let priority_num: number;

        const { patient_name, queue_status } = createQueueDto;  // Destructuring from DTO

        if (queue_status === 'urgent') {
            // Step 1: Update all normal patients' priorities by incrementing their priority
            await this.queueRepository.query(`
                UPDATE Queue
                SET priority_num = priority_num + 1
                WHERE queue_status = 'normal';
            `);

            // Step 2: Determine priority for urgent case and insert new urgent patient with updated priority
            priority_num = (await this.queueRepository.count({ where: { queue_status: QueueStatus.Urgent } })) + 1;
        } else {
            // For normal patient, priority is the count of all queue entries (normal and urgent) + 1
            priority_num = (await this.queueRepository.count()) + 1;
        }

        // Step 3: Create and save the new queue entry with the calculated priority
        const newQueue = this.queueRepository.create({
            patient_name,
            queue_status,
            priority_num,
        });

        return this.queueRepository.save(newQueue);
    }

    // Update an existing queue entry
    async update(q_id: number, updateQueueDto: UpdateQueueDto): Promise<Queue> {
        const queue = await this.queueRepository.findOne({ where: { q_id } });
        if (!queue) {
            throw new Error('Queue not found');
        }
        Object.assign(queue, updateQueueDto);
        return this.queueRepository.save(queue);
    }

    // Get a single queue entry by id
    async findOne(q_id: number): Promise<Queue> {
        console.log('Received ID:', q_id);
        const queue = await this.queueRepository.findOne({ where: { q_id } });
        if (!queue) {
            throw new Error('Queue not found');
        }
        return queue;
    }

    // Get all queues with optional filters (status, progress, etc.)
    async findAll(id?: number, status?: QueueStatus, progress?: QueueProgress, priority?: number): Promise<Queue[]> {
        const query = this.queueRepository.createQueryBuilder('queue');

        if (status) {
            query.andWhere('queue.queue_status = :status', { status });
        }

        if (progress) {
            query.andWhere('queue.queue_progress = :progress', { progress });
        }

        if (priority) {
            query.andWhere('queue.priority_num = :priority', { priority });
        }

        if (id) {
            query.andWhere('queue.q_id = :id', { id });
        }

        return query.getMany();
    }

    // Delete a queue by id
    async remove(id: number): Promise<void> {
        await this.queueRepository.delete(id);
    }
}
