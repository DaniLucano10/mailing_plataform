import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'; // Asegúrate de que importas el servicio de Users
import { RegisterDto } from './dto/register.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from './constants/jwt.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para registrar un usuario
  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña antes de guardar el usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword, // Guardamos la contraseña hasheada
    });

    // Generamos el payload para el JWT
    const payload = { id: user.id, username: user.username, email: user.email };

    // Firmamos el JWT
    const token = this.jwtService.sign(payload, { expiresIn: '1d' });

    return { token }; // Retornamos el token generado
  }

  // Método para login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '60m',
    });
    return { token };
  }

  logout() {
    return { message: 'Cierre de sesión exitoso' };
  }
}
