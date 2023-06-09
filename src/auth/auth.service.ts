
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}