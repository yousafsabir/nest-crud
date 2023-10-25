import { Injectable } from '@nestjs/common';
import { DbService } from 'db/db.service';

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}
  signup() {
    return { message: "I'm signed up" };
  }

  login() {
    return { message: "I'm logged in" };
  }
}
