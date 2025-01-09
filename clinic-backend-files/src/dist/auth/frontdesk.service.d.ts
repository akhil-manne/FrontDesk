import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity';
export declare class FrontDeskStaffService {
    private frontDeskStaffRepository;
    constructor(frontDeskStaffRepository: Repository<FrontDeskStaff>);
    findByUsername(username: string): Promise<FrontDeskStaff | undefined>;
}
