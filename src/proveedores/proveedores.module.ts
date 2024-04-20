import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';

import { PrismaModule } from '../prisma.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [PrismaModule, ProductosModule],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
