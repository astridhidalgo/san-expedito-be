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

import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'san_expedito',
      entities: [],
      synchronize: true,
    }),
    CategoriasModule,
    UsuariosModule,
    FacturasModule,
    ClientesModule,
    ProductosModule,
    ProveedoresModule,
    FacturasProductosModule,
    PrismaModule,
    AuthModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
