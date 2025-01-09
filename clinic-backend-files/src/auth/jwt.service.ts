import { Injectable } from '@nestjs/common';
import { JwtService as JwtLib } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtService {
    constructor(private jwt: JwtLib) { }

    // Generate JWT Token
    async generateToken(payload: JwtPayload): Promise<string> {
        return this.jwt.sign(payload);
    }

    // Validate and decode JWT Token
    async validateToken(token: string): Promise<JwtPayload | null> {
        try {
            const decoded = this.jwt.verify(token);
            return decoded as JwtPayload;
        } catch (err) {
            return null;
        }
    }
}
