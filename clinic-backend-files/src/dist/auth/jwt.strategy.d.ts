import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private frontDeskStaffRepository;
    constructor(frontDeskStaffRepository: Repository<FrontDeskStaff>);
    validate(payload: any): Promise<FrontDeskStaff>;
}
export {};
