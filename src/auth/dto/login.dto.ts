import { Transform } from 'class-transformer';
import { IsString, MinLength, minLength } from 'class-validator';
export class LoginDto {
    @IsString()
    @MinLength(1)
    email: string;
    @IsString()
    @MinLength(1)
    @Transform(({value})=> value.trim())
    password: string;
}