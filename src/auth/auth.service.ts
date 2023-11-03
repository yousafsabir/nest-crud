import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { DbService } from 'db.service';
import { SignupDTO, LoginDTO } from 'auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signup(dto: SignupDTO) {
    try {
      // generate password hash
      const passHash = await argon.hash(dto.password);
      // save user in db
      const user = await this.db.user.create({
        data: {
          ...dto,
          password: passHash,
        },
      });
      // return the token
      const token = await this.generateToken(user.id);
      return { token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'User with these credentials already exists',
          );
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDTO) {
    // find the user
    const user = await this.db.user.findUnique({ where: { email: dto.email } });
    // user not found
    if (!user) {
      throw new NotFoundException('User Does not exist');
    }
    // verify the password
    if (!(await argon.verify(user.password, dto.password))) {
      throw new BadRequestException('Wrong Password');
    }
    // return the token
    const token = await this.generateToken(user.id);
    return { token };
  }

  private generateToken(userId: number) {
    return this.jwt.signAsync(
      { sub: userId },
      {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
      },
    );
  }
}
