import { Controller, Get, Post, Body, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { CreateUserDTO } from 'src/dtos/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  //create user
  @Post('/createUser')
  async create(@Body() userDTO: CreateUserDTO){
    const user = new User();
    user.name = userDTO.name;
    user.email = userDTO.email;
    user.password = userDTO.password;
    return await this.usersService.create(user);
  }

  // @UseGuards(AuthGuard)
  @Public()
  @Get('/getUsers')
  async getUsers(){
    return this.usersService.getusers();
  }

}