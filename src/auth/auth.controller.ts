
import { Controller, Get, Post, Body, SetMetadata, UseGuards, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/dtos/login.dto';
import { Public } from 'src/users/users.controller';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('logout')
  async logout(@Req() request: any){
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    await this.authService.logout(token);
  }
}