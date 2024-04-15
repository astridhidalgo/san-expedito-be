import { Module } from '@nestjs/common';
import { FacturasProductosService } from './facturas_productos.service';
import { FacturasProductosController } from './facturas_productos.controller';

@Module({
  controllers: [FacturasProductosController],
  providers: [FacturasProductosService],
})
export class FacturasProductosModule {}
