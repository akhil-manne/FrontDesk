import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto'; // Make sure LoginDto is correctly imported

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // Pass the entire loginDto object, not individual values
        const user = await this.authService.validateUser(loginDto);
        if (!user) {
            throw new HttpException('Invalid CRedentials', HttpStatus.UNAUTHORIZED);
        }
        console.log('Login Dto : ', loginDto);
        return this.authService.login(user);
    }
}
