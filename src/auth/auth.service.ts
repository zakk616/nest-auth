import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { randomBytes } from 'crypto';

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

    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.refreshAccessToken();

    return {
      access_token: access_token,
      refresh_token: this.usersService.updateLoginStatus(email, refresh_token)
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

  async refreshAccessToken() {
    return await randomBytes(32).toString('hex');;
  }  

  async logout(token: string): Promise<void> {
    // Add the token to the list of revoked tokens
     await this.revokedTokens.push(token);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    // Check if the token exists in the list of revoked tokens
    return await this.revokedTokens.includes(token);
  }
  
}