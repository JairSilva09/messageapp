import { Transform } from 'class-transformer';
import { IsString, MinLength, minLength } from 'class-validator';
export class RegisterDto {
    @IsString()
    email: string;
    @IsString()
    @MinLength(6)
    @Transform(({value})=> value.trim())
    password: string;
    @IsString()
    @MinLength(1)
    @Transform(({value})=> value.trim())
    nick: string;
}