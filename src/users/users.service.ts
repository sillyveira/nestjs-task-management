import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { hash as bcrypt } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    private users: UserDTO[] = [
        {
            id: '1',
            username: 'user',
            password: '123'
        }
    ]

    async create(newUser: UserDTO) {
        newUser.password = await bcrypt(newUser.password, 10);

        try {
            const result = await this.prisma.user.create({
                data: {
                    username: newUser.username,
                    password: newUser.password,
                },
                select: { // removes the password
                    id: true,
                    username: true
                }
            });
            return result;
        } catch (e: any) {
            // 'P2002' = unique constraint failed
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                throw new HttpException('Esse nome de usuário já existe.', HttpStatus.NOT_ACCEPTABLE);
            }
            throw e;
        }
    }

    async findByUsername(user: string): Promise<UserDTO | undefined> {
        if (!user) throw new HttpException('Informe um nome de usuário.', HttpStatus.BAD_REQUEST);

        const userExists = await this.prisma.user.findUnique({ where: { username: user } });
        return userExists as unknown as UserDTO | undefined;
    }
}
