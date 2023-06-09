
import { Body, Controller,Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string, password: string }) {
    console.log(credentials);
    return this.authService.login(credentials.username, credentials.password);
  }
}