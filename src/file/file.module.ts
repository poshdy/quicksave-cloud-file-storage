import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { StorageModule } from 'src/storage/storage.module';
import { StorageService } from 'src/storage/storage.service';
import { FileRepo } from './repositories/file.repo';
import { FileServiceHelper } from './services/file.service.helper';
import { FileUserRepo } from './repositories/file-user.repo';
import { FileEvents } from './events/file.events';
import { DriveController } from './controllers/file.drive.controller';
@Module({
  imports: [StorageModule],
  controllers: [FileController, DriveController],
  providers: [
    FileService,
    StorageService,
    FileRepo,
    FileServiceHelper,
    FileUserRepo,
    FileEvents,
  ],
})
export class FileModule {}
