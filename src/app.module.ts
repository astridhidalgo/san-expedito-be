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
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Categoria } from './categorias/entities/categoria.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Proveedor } from './proveedores/entities/proveedor.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Producto } from './productos/entities/producto.entity';
import { Factura } from './facturas/entities/factura.entity';
import { FacturasProducto } from './facturas_productos/entities/facturas_producto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'san_expedito',
      entities: [Categoria, Cliente, Proveedor, Usuario, Producto, Factura, FacturasProducto],
      synchronize: true
    }), 
    CategoriasModule,
    UsuariosModule,
    FacturasModule, 
    ClientesModule, 
    ProductosModule, 
    ProveedoresModule, 
    FacturasProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
