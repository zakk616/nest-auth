import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
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

  async findUser(username: string, password: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        name: username,
        password: password
      }
    })
}



  

}
