import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient, Producto } from '@prisma/client';

import { FacturasProductosService } from '../facturas_productos/facturas_productos.service';

@Injectable()
export class ProductosService {
  constructor(
    private prisma: PrismaClient,
    private readonly facturasProductosService: FacturasProductosService,
  ) {}

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
        id: true,
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

  async remove(id: number): Promise<void> {
    const facturaProductos = await this.facturasProductosService.findFacturasByProductoId(id);
    if (facturaProductos) {
      throw new BadRequestException('el producto no puede ser eliminado por que tiene registros asociados');
    }
    await this.prisma.producto.delete({
      where: {
        id: id,
      },
    });
  }

  async contadorProductos() {
    try {
      // Realiza una consulta a la base de datos para obtener la cantidad de productos
      const cantidadProductos = await this.prisma.producto.count();

      // Devuelve la cantidad de productos
      return cantidadProductos;
    } catch (error) {
      // Maneja los errores en caso de que ocurran
      console.error('Error al contar los productos:', error);
      throw error; // Opcional: puedes lanzar el error para que sea manejado en otra parte de tu aplicación
    }
  }
}
