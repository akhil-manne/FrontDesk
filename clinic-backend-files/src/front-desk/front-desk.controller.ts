import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // Import AuthService for login functionality
import { LoginDto } from 'src/dto/login.dto';  // Create DTO to define the body of the login request

@Controller('front-desk')
export class FrontDeskController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
