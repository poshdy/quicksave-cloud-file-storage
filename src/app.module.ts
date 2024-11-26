import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileModule } from './file/file.module';
import { StorageModule } from './storage/storage.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    EventEmitterModule.forRoot({ verboseMemoryLeak: true }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    FileModule,
    StorageModule,
    FolderModule,
  ],
})
export class AppModule {}
