import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, AuthSignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }

  async signIn(dto: AuthSignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwt
      .signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      })
      .then((token) => {
        return {
          access_token: token,
        };
      });
  }
}
