import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User name', example: '' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User email', example: 'a@a.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User password', example: 'password' })
    password: string;
}