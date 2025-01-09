import { JwtService as JwtLib } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
export declare class JwtService {
    private jwt;
    constructor(jwt: JwtLib);
    generateToken(payload: JwtPayload): Promise<string>;
    validateToken(token: string): Promise<JwtPayload | null>;
}
