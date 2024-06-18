import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { RestoreService } from './restore.service';

@Module({
  controllers: [BackupController],
  providers: [BackupService, RestoreService],
})
export class BackupModule {}
