import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import {v4 as uuid} from 'uuid';

import { hashSync as bcrypt } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDTO[]  = [
        {
            id: '1',
            username: 'user',
            password: '123'
        }
    ]

    create(newUser: UserDTO){
        const userExists =  this.users.find((user: UserDTO) => newUser.username === user.username)

        if (!userExists) {
            newUser.id = uuid();
            newUser.password = bcrypt(newUser.password, 10);
            this.users.push(newUser);
            return "O usuário foi criado com sucesso."
        }

        throw new HttpException('Esse nome de usuário já existe.', HttpStatus.NOT_ACCEPTABLE);
    }
}
