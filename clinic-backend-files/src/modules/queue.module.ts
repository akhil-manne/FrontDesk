import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from '../entities/queue.entity';
import { QueueService } from 'src/services/queue.service';
import { QueueController } from 'src/controllers/queue.controller';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Queue])],
    controllers: [QueueController],
    providers: [QueueService, JwtAuthGuard],
    exports: [QueueService], // Exported for usage in other modules if needed
})
export class QueueModule { }