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
import { MailModule } from './mail/mail.module';
import { BackupModule } from './backup/backup.module';
import * as process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
    MailModule,
    BackupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
