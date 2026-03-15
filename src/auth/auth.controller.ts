import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDTO, AuthResponseDTO } from './auth.dto';
import { hashSync as bcrypt } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    signIn(@Body() body: AuthBodyDTO) {
        if(body) return this.authService.signIn(body);
        throw new HttpException('Informe um nome de usuário e uma senha.', HttpStatus.NOT_FOUND);
    }
}
