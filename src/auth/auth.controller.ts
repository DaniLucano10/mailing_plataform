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
  async logout(@Body() logoutDto: LogoutDto) {
    // Lógica de cierre de sesión (puede ser invalidar el token o eliminarlo del frontend)
    // El correo y el token que se envían por la solicitud pueden ser usados para invalidar el token en la base de datos si se implementa
    console.log(logoutDto.email);  // Verificar que se recibe correctamente
    console.log(logoutDto.access_token);  // Verificar que se recibe correctamente

    return { message: 'Sesión cerrada correctamente' };
  }
}
