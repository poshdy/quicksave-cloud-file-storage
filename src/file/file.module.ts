import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { StorageModule } from 'src/storage/storage.module';
import { StorageService } from 'src/storage/storage.service';
import { FileRepo } from './repoistories/file.repo';
import { FileServiceHelper } from './file.service.helper';

@Module({
  imports: [StorageModule],
  controllers: [FileController],
  providers: [FileService, StorageService, FileRepo, FileServiceHelper],
})
export class FileModule {}
