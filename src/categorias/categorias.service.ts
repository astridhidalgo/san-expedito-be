import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class CategoriasService {
  constructor(
    private prisma: PrismaClient,
    private readonly productosService: ProductosService,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: {
        nombre: createCategoriaDto.nombre,
      },
    });
  }

  findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany({
      orderBy: {
        id: 'asc', // Orden ascendente por nombre. Cambia a 'desc' para orden descendente
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
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
