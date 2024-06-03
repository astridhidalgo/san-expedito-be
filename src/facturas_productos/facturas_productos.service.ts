import { Injectable } from '@nestjs/common';
import { UpdateFacturasProductoDto } from './dto/update-facturas_producto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FacturasProductosService {
  constructor(private prisma: PrismaClient) {}
  async create(facturaId: number, productoId: number, cantidad: number, totalPorProducto: number, tx: any): Promise<void> {
    const connect = tx ? tx : this.prisma;
    try {
      await connect.factura_producto.create({
        data: {
          factura_id: facturaId,
          producto_id: productoId,
          cantidad: cantidad,
          totalPorProducto,
        },
      });
      console.log('Relación factura-producto creada correctamente');
    } catch (error) {
      console.error('Error al crear la relación factura-producto:', error);
      throw new Error('Error al crear la relación factura-producto');
    }
  }

  findAll() {
    return `This action returns all facturasProductos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturasProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturasProducto`;
  }

  async findFacturasByProductoId(id: number) {
    return this.prisma.factura_producto.findMany({ where: { producto_id: id } });
  }
}
