import { IsString, MinLength, minLength } from 'class-validator';
export class CreateUsuarioDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsString()
    @MinLength(1)
    nick: string;
}
