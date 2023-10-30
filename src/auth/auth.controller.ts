import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { SignupDTO } from 'auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')

  // Validation pipe for a single request
  signup(@Body(new ValidationPipe()) dto: SignupDTO) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
