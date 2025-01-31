import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';
import { LogoutDto } from './dto/logout.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Public()
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);  // Llamamos al servicio de registro
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Cierre de sesión@Post('logout')
  @Post('logout')
  logout() {
    return this.authService.logout(); // Llamada al método de logout
  }
}
