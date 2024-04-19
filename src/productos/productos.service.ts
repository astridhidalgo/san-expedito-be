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

  async findAll() {
    return this.prisma.producto.findMany({
      orderBy: {
        nombre: 'asc',
      },
      select: {
        codigo: true,
        nombre: true,
        descripcion: true,
        cantidad: true,
        precio: true,
        unidad_medida: true,
        categoria: {
          select: {
            nombre: true,
          },
        },
        proveedor: {
          select: {
            nombre: true,
          },
        },
      },
    });
  }

  findProductosByCategoria(id: number) {
    console.log('BUSCO PRODUCTOS');
    return this.prisma.producto.findFirst({ where: { categoria_id: id } });
  }

  findOne(id: number) {
    return this.prisma.producto.findUnique({ where: { id }, select: { cantidad: true } });
  }

  findProductoByCodigo(codigo: string) {
    return this.prisma.producto.findFirst({ where: { codigo: codigo } });
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  updateStock(productoId: number, cantidad, tx: any) {
    const connect = tx ? tx : this.prisma;
    return connect.producto.update({ where: { id: productoId }, data: { cantidad } });
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
