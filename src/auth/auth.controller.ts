
import { Controller, Get, Post, Body, SetMetadata, UseGuards, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string, password: string }) {
    return this.authService.login(credentials.email,credentials.password);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() request: any){
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    await this.authService.logout(token);
  }
}