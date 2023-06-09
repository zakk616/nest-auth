import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //create user
  @Post('/createUser')
  async create(@Body() userDTO: UserDTO){
    const user = new User();
    user.name = userDTO.name;
    user.email = userDTO.email;
    return await this.usersService.create(user);
  }

  //get users
  @Get('/getUsers')
  async getUsers(){
    return this.usersService.getusers();
  }

}