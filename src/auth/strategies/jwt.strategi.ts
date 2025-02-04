import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { jwtConstants } from '../constants/jwt.constant';
// import { ActiveToken } from '../entities/active-token.entity';
// import { BlacklistedToken } from '../entities/blacklisted-token.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() // @InjectRepository(ActiveToken)
  // private readonly activeTokenRepository: Repository<ActiveToken>,
  // @InjectRepository(BlacklistedToken)
  // private readonly blacklistTokenRepository: Repository<BlacklistedToken>,
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.username,
      email: payload.email,
    };
  }
}
