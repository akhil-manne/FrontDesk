import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
