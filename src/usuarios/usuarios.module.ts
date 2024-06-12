import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
