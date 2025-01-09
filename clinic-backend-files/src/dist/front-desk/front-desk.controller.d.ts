import { AuthService } from '../auth/auth.service';
import { LoginDto } from 'src/dto/login.dto';
export declare class FrontDeskController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
