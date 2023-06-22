import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {

  private revokedTokens: string[] = [];  

  constructor(
    private usersService: UserService,
    private jwtService: JwtService) 
    {}

  async login(email: string, pass: string){
    const user = await this.usersService.getuserByEmail(email);
    const passwordMatches = await bcrypt.compare(pass, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.generateAccessToken(user),
    };
  }

  async generateAccessToken(user: User) {
    const payload = {
      id: user.id,
      username: user.name,
    };

    const secretKey = 'your-secret-key';
    const expiresIn = '1h';

    const accessToken = this.jwtService.sign(payload, {secret: secretKey, expiresIn: expiresIn});

    return accessToken;
  }

  async logout(token: string): Promise<void> {
     await this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string){
    return this.revokedTokens.includes(token);
  }


  
}