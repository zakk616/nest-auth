import { Controller, Get, Post, Body, SetMetadata, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { CreateUserDTO } from 'src/dtos/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcrypt';


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  
  @Post('/createUser')
  async create(@Body() userDTO: CreateUserDTO){
    const user = new User();
    user.name = userDTO.name;
    user.email = userDTO.email;
    user.password = await bcrypt.hash(userDTO.password, 10);
    return await this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  //@Public()
  @Get('/getUsers')
  async getUsers(){
    return this.usersService.getusers();
  }

}