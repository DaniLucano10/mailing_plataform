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
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result; // Retorna el token JWT
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    try {
      const result = await this.authService.register(registerDto);
      return result; // Retorna el token JWT
    } catch (error) {
      throw error; // Propaga el error (ConflictException o cualquier otro)
    }
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
