import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

import { PrismaModule } from '../prisma.module';
import * as module from 'node:module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
