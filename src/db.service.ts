import { Global, Module, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient {}

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
