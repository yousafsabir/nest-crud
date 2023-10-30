import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'db/db.service';
import { SignupDTO } from 'auth/dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}
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
      // return saved user
      return { message: 'Signed Up', user };
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

  login() {
    return { message: "I'm logged in" };
  }
}
