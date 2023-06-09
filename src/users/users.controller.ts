import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //create user
  @Post('/createUser')
  // async create(@Body() user: UserDTO){
  //   return this.usersService.create(user);
  // }
  create(@Body() user: UserDTO): Promise<User> {
    return this.usersService.create(user);
  }

  //get users
  @Get('/getUsers')
  async getUsers(){
    return this.usersService.getusers();
  }

}