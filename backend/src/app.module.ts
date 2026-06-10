import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs/redis';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'neon://user:password@host:port/dbname',
    }),
    RedisModule.register({
      config: {
        host: 'upstash-host',
        port: 6379,
        password: 'upstash-password',
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'upstash-host',
        port: 6379,
        password: 'upstash-password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
