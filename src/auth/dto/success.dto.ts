import { Transform } from 'class-transformer';
import { IsString, MinLength, minLength } from 'class-validator';

export class SuccessDto{    
    access_token: string;
}
