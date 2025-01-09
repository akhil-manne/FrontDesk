import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity'; // Adjust accordingly

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(FrontDeskStaff)
        private frontDeskStaffRepository: Repository<FrontDeskStaff>, // Assuming frontDeskStaff entity
    ) { }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;  // Destructure the values from LoginDto
        const staff = await this.frontDeskStaffRepository.findOne({ where: { staff_username: username } });
        console.log('Fetched Staff:', staff);
        if (staff && staff.staff_password === password) { // Compare plain text passwords
            return staff;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.staff_username, sub: user.staff_id }; // Adjust based on the entity fields
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
