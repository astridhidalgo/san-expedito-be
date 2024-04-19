import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { PrismaModule } from '../prisma.module';
import { ClientesModule } from '../clientes/clientes.module';
import { FacturasProductosModule } from '../facturas_productos/facturas_productos.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [PrismaModule, ClientesModule, FacturasProductosModule, ProductosModule],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
