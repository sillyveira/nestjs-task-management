import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthBodyDTO, AuthResponseDTO } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirrationTimeInMs: number | undefined;  
  constructor(
  private readonly usersService: UsersService,
  private readonly configService: ConfigService,
  private readonly jwtService: JwtService
  ) {
    this.jwtExpirrationTimeInMs = this.configService.get<number>("JWT_EXPIRATION")
  }

  async signIn(body: AuthBodyDTO) : Promise<AuthResponseDTO> {
    if (!body.username || !body.password) {
      throw new HttpException(
        'Está faltando credenciais.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.findByUsername(body.username)

    if (user === undefined) throw new HttpException(
        'Credenciais inválidas.',
        HttpStatus.NOT_FOUND,
      );
    
    const login = bcryptCompare(body.password, user.password);
    
    if(login) {
      return {
        token: this.jwtService.sign({sub: user.id, username: user.username}),
        expiresAt: this.jwtExpirrationTimeInMs || 1000 * 3600
      }
    }

    throw new HttpException(
        'Credenciais inválidas (senha).',
        HttpStatus.NOT_FOUND,
    );

  }
}
