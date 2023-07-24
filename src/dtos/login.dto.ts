import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email', example: 'ali@gmail.com' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password' })
  password: string;
}
