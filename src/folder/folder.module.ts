import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { FolderRepo } from './folder.repo';

@Module({
  controllers: [FolderController],
  providers: [FolderService, FolderRepo],
})
export class FolderModule {}
