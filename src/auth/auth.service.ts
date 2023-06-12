
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService) 
    {}

  async login(username: string, pass: string){
    const user = await this.usersService.findUser(username, pass);

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { is: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {secret: "apka apna secret key"}),
    };
  }
}