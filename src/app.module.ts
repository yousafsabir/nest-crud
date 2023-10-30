import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { DbModule } from 'db/db.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule, DbModule],
})
export class AppModule {}
