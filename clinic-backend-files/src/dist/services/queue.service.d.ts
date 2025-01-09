import { Repository } from 'typeorm';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { UpdateQueueDto } from '../dto/update-queue.dto';
import { Queue } from '../entities/queue.entity';
import { QueueStatus, QueueProgress } from '../enums/queue.enum';
export declare class QueueService {
    private queueRepository;
    constructor(queueRepository: Repository<Queue>);
    create(createQueueDto: CreateQueueDto): Promise<Queue>;
    update(q_id: number, updateQueueDto: UpdateQueueDto): Promise<Queue>;
    findOne(q_id: number): Promise<Queue>;
    findAll(id?: number, status?: QueueStatus, progress?: QueueProgress, priority?: number): Promise<Queue[]>;
    remove(id: number): Promise<void>;
}
