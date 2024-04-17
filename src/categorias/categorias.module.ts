import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaModule } from '../prisma.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [PrismaModule, ProductosModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
