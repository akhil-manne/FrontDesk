import { QueueService } from '../services/queue.service';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { UpdateQueueDto } from '../dto/update-queue.dto';
import { Queue } from '../entities/queue.entity';
import { QueueProgress, QueueStatus } from 'src/enums/queue.enum';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    create(createQueueDto: CreateQueueDto): Promise<Queue>;
    findAll(id: any, status?: QueueStatus, progress?: QueueProgress, priority?: number): Promise<Queue[]>;
    findOne(id: number): Promise<Queue>;
    update(id: number, updateQueueDto: UpdateQueueDto): Promise<Queue>;
    remove(id: number): Promise<void>;
}
