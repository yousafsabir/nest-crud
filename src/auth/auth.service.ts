import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { message: "I'm signed up" };
  }

  login() {
    return { message: "I'm logged in" };
  }
}
