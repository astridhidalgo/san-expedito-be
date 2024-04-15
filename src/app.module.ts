import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FacturasModule } from './facturas/facturas.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { FacturasProductosModule } from './facturas_productos/facturas_productos.module';

@Module({
  imports: [CategoriasModule, UsuariosModule, FacturasModule, ClientesModule, ProductosModule, ProveedoresModule, FacturasProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
