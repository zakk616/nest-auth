
import { Controller, Get, Post, Body, SetMetadata, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string, password: string }) {
    return this.authService.login(credentials.username,credentials.password);
  }

  @UseGuards(AuthGuard)
  @Post('logout/:token')
  async logout(@Param('token') token: string): Promise<void> {
    await this.authService.logout(token);
  }
}