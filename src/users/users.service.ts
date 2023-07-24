import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { isEmail } from 'class-validator';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(user: User) {
    return await this.userRepository.saveUser(user);
  }

  async getusers() {
    return await this.userRepository.findAll();
  }

  async getuserByEmail(email: string): Promise<User> {
    return await this.userRepository.getuserByEmail(email);
  }

  // async updateLoginStatus(email: string, refreshToken: any) {
  //   return await this.userRepository.update(email, {
  //     refresh_token: refreshToken
  //   });
  // }

}
