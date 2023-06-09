import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';

@Injectable()
export class UserRepository extends Repository<User> {}
