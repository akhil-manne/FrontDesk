"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const queue_entity_1 = require("../entities/queue.entity");
const queue_enum_1 = require("../enums/queue.enum");
let QueueService = class QueueService {
    constructor(queueRepository) {
        this.queueRepository = queueRepository;
    }
    async create(createQueueDto) {
        let priority_num;
        const { patient_name, queue_status } = createQueueDto;
        if (queue_status === 'urgent') {
            await this.queueRepository.query(`
                UPDATE Queue
                SET priority_num = priority_num + 1
                WHERE queue_status = 'normal';
            `);
            priority_num = (await this.queueRepository.count({ where: { queue_status: queue_enum_1.QueueStatus.Urgent } })) + 1;
        }
        else {
            priority_num = (await this.queueRepository.count()) + 1;
        }
        const newQueue = this.queueRepository.create({
            patient_name,
            queue_status,
            priority_num,
        });
        return this.queueRepository.save(newQueue);
    }
    async update(q_id, updateQueueDto) {
        const queue = await this.queueRepository.findOne({ where: { q_id } });
        if (!queue) {
            throw new Error('Queue not found');
        }
        Object.assign(queue, updateQueueDto);
        return this.queueRepository.save(queue);
    }
    async findOne(q_id) {
        console.log('Received ID:', q_id);
        const queue = await this.queueRepository.findOne({ where: { q_id } });
        if (!queue) {
            throw new Error('Queue not found');
        }
        return queue;
    }
    async findAll(id, status, progress, priority) {
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
    async remove(id) {
        await this.queueRepository.delete(id);
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(queue_entity_1.Queue)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QueueService);
//# sourceMappingURL=queue.service.js.map