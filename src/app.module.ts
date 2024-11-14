import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    EventEmitterModule.forRoot({ verboseMemoryLeak: true }),
    AuthModule,
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
