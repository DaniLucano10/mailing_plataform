import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { jtwConstants } from './constants/jwt.constant';

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

    // Crear el usuario
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generar el token JWT
    const payload = { id: user.id, username: user.username, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  // Login de usuario
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar el usuario por email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Comparar la contraseña proporcionada con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);

    // Verificar el resultado de la comparación
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Generar el token JWT
    const payload = { id: user.id, username: user.username, email: user.email };
    return {
      token: this.jwtService.sign(payload, { secret: jtwConstants.secret }),
    };
  }
}
