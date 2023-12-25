import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, AuthSignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.AuthService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthSignInDto) {
    return this.AuthService.signIn(dto);
  }
}
