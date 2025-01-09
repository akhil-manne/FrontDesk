// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FrontDeskStaff } from 'src/entities/frontdeskstaff.entity'; // Ensure correct path
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { FrontDeskStaffService } from './frontdesk.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([FrontDeskStaff]),  // Register your entity
        PassportModule,
        JwtModule.register({
            secret: jwtConfig.secret,  // Use the same secret here as in your config
            signOptions: jwtConfig.signOptions,  // Token expiration
        }),
    ],
    providers: [AuthService, JwtStrategy, FrontDeskStaffService],
    controllers: [AuthController],
})
export class AuthModule { }
