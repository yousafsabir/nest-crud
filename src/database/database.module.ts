import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionPool = new Pool({
          connectionString: configService.getOrThrow('DB_URI'),
        });
        return drizzle(connectionPool, {
          schema: {},
        });
      },
    },
  ],
})
export class DatabaseModule {}
