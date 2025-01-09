import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity';

@Injectable()
export class FrontDeskStaffService {
    constructor(
        @InjectRepository(FrontDeskStaff)
        private frontDeskStaffRepository: Repository<FrontDeskStaff>,
    ) { }

    async findByUsername(username: string): Promise<FrontDeskStaff | undefined> {
        return this.frontDeskStaffRepository.findOne({ where: { staff_username: username } });
    }
}
