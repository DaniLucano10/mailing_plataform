import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';  // Cambiado de bcrypt a bcryptjs

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Registro de usuario
  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Contraseña hasheada durante el registro:', hashedPassword); // Depuración

    // Crear el usuario
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log('Hash generado:', hashedPassword);
    // Generar el token JWT
    const payload = { id: user.id, username: user.username, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const token = this.jwtService.sign(payload); 
    
    console.log('🔑 Token generado:', token); // 🛠️ Depuración

    return { token };
}

}
