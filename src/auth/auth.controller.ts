import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    Res, 
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)    
    @Post('login')
    login(@Body() loginDto: LoginDto, @Res() response){
        return this.authService.login(loginDto)
        .then(
            mensaje => {response.status(HttpStatus.OK).json(mensaje)}
        )
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto, @Res() response){
        return this.authService.register(registerDto)
        .then(
            mensaje => {response.status(HttpStatus.CREATED).json(mensaje)}
        )
        .catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'No se creo el usuario'
                })
            }
        )
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
