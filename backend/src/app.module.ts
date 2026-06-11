// entire content of the module configuration file ...
import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nest-redis';
import { PrismaModule } from './prisma/prisma.module';
import { BullModule, BullModuleOptions } from 'bullmq';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.registerFromConfig(), // Ensure NestJS uses the configuration for connecting to both Redis and Prisma services
    AppModule,
    PrismaModule,
    BullModule.forRootAsync(BullModuleOptions), // Set up Bul letter with asynchronous support as required by our application logic
  ],
  // ... goes in between
})
export class AppModule {}
