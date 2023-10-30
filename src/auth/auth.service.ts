import { Injectable } from '@nestjs/common';
import { DbService } from 'db/db.service';
import { SignupDTO } from 'auth/dto';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}
  signup(data: SignupDTO) {
    // console.log({ data });
    return { message: "I'm signed up" };
  }

  login() {
    return { message: "I'm logged in" };
  }
}
