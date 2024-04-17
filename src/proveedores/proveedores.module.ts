import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';

import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
