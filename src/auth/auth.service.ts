import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password/password.service';
import { LoginDto } from './dto/login.dto';
import { SuccessDto } from './dto/success.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(
        private readonly usuariosService: UsuariosService, 
        private readonly passwordService: PasswordService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<string|SuccessDto>{
        const usuario = await this.usuariosService.findOneByEmail(loginDto.email);
        if(usuario){
            const isMatch = await this.passwordService.comparePasswords(loginDto.password, usuario.password);
            if (!isMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload = {
                id: usuario.id,
                rol: usuario.rol,
                nick: usuario.nick,
                email: usuario.email
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        }
        return 'el usuario no existe'
    }

    async register(registerDto: RegisterDto): Promise<Usuario>{
        const usuario = await this.usuariosService.findOneByEmail(registerDto.email);
        if(usuario){
            throw new BadRequestException('El usuario ya existe');
        }
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        return this.usuariosService.create({...registerDto,password: hashedPassword});
    }

}
