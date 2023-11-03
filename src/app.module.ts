import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from 'env.validation';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { DbModule } from 'db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      validate,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    DbModule,
  ]
})
export class AppModule {}
