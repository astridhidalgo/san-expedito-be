import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient, Producto } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaClient) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.prisma.producto.create({
      data: {
        codigo: createProductoDto.codigo,
        nombre: createProductoDto.nombre,
        descripcion: createProductoDto.descripcion,
        cantidad: createProductoDto.cantidad,
        categoria_id: createProductoDto.categoriaId,
        proveedor_id: createProductoDto.proveedorId,
        precio: createProductoDto.precio,
        unidad_medida: createProductoDto.unidad_medida,
      },
    });
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
