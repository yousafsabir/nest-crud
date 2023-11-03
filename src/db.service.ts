import { Global, Module, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log("DB Connected")
  }
}

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
