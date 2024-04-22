import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaClient } from '@prisma/client';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class CategoriasService {
  constructor(
    private prisma: PrismaClient,
    private readonly productosService: ProductosService,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: {
        nombre: createCategoriaDto.nombre,
      },
    });
  }

  async findAll() {
    return this.prisma.categoria.findMany({
      orderBy: {
        id: 'asc', // Orden ascendente por nombre. Cambia a 'desc' para orden descendente
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: { nombre: updateCategoriaDto.nombre },
    });
  }

  async remove(id: number): Promise<void> {
    const categoriaProductos = await this.productosService.findProductosByCategoria(id);
    if (categoriaProductos) {
      throw new BadRequestException('la categoria no puede ser eliminada por que tiene registros asociados');
    }
    await this.prisma.categoria.delete({
      where: {
        id: id,
      },
    });
  }
}
