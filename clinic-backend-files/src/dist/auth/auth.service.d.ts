import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity';
export declare class AuthService {
    private jwtService;
    private frontDeskStaffRepository;
    constructor(jwtService: JwtService, frontDeskStaffRepository: Repository<FrontDeskStaff>);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
