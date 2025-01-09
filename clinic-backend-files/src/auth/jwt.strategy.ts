import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(FrontDeskStaff)
        private frontDeskStaffRepository: Repository<FrontDeskStaff>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret, // Match your JWT_SECRET_KEY
        });
    }

    async validate(payload: any) {
        return this.frontDeskStaffRepository.findOne(payload.sub); // Validate against the staff in the database
    }

    // async validate(payload: JwtPayload) {
    //     const user = await this.usersService.findOne({ where: { username: payload.username } });  // Make sure selection conditions are specified!
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }

}
