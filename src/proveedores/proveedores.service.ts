import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { PrismaClient } from '@prisma/client';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class ProveedoresService {
  constructor(
    private prisma: PrismaClient,
    private readonly productosService: ProductosService,
  ) {}
  create(createProveedoreDto: CreateProveedoreDto) {
    return this.prisma.proveedor.create({ data: { nombre: createProveedoreDto.nombre } });
  }

  findAll() {
    return this.prisma.proveedor.findMany({ orderBy: { id: 'asc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  async remove(id: number): Promise<void> {
    const proveedorProductos = await this.productosService.findProductosByCategoria(id);
    if (proveedorProductos) {
      throw new BadRequestException('el proveedor no puede ser eliminado por que tiene registros asociados');
    }
    await this.prisma.proveedor.delete({
      where: {
        id: id,
      },
    });
  }
}
