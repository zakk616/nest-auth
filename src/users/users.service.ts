import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from 'src/dtos/user.dto';
import { UserRepository } from './user.repository';

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

}
