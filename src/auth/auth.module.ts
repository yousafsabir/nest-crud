import { Module } from '@nestjs/common';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { DbModule } from 'db/db.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
