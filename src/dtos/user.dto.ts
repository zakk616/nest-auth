import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}