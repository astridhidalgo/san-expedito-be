import { Module } from '@nestjs/common';
import { FacturasProductosService } from './facturas_productos.service';
import { FacturasProductosController } from './facturas_productos.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FacturasProductosController],
  providers: [FacturasProductosService],
  exports: [FacturasProductosService],
})
export class FacturasProductosModule {}
