import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async saveUser(user: User) {
        const {password, ...userWithoutPassword} = await this.userRepository.save(user);
        return userWithoutPassword;
    }

    // sample method for demo purposes
    async findAll(){
        return await this.userRepository.find({}) // could also be this.findOneBy({ email });, but depending on your IDE/TS settings, could warn that userRepository is not used though. Up to you to use either of the 2 methods
    }

    async getuserByEmail(email: string): Promise<User | null>{
        return await this.userRepository.findOneBy({email});
    }   
}
