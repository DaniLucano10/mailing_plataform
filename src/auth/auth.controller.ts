import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@Public()
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }
}
