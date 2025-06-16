import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    private readonly saltOrRounds = 10;

    async hashPassword(plainPassword: string): Promise<string> {
        return await bcrypt.hash(plainPassword, this.saltOrRounds);
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

}
