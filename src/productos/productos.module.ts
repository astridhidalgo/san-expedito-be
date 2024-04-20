import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

import { Repository } from 'typeorm';
import { PrismaModule } from '../prisma.module';
import { FacturasProductosModule } from '../facturas_productos/facturas_productos.module';

@Module({
  imports: [PrismaModule, FacturasProductosModule],
  controllers: [ProductosController],
  providers: [ProductosService, Repository],
  exports: [ProductosService],
})
export class ProductosModule {}
