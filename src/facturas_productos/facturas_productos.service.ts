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

  async productosMasVendidosDelMes() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    try {
      const productosMasVendidos = await this.prisma.factura_producto.groupBy({
        by: ['producto_id'],
        _sum: {
          cantidad: true,
        },
        where: {
          factura: {
            fecha_creacion: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
        },
        orderBy: {
          _sum: {
            cantidad: 'desc',
          },
        },
      });

      console.log('Productos más vendidos del mes:');
      productosMasVendidos.forEach((producto) => {
        console.log(`Producto ID: ${producto.producto_id}, Cantidad vendida: ${producto._sum.cantidad}`);
      });
    } catch (error) {
      console.error('Error al obtener los productos más vendidos del mes:', error);
    }
  }

  async findFacturasByProductoId(id: number) {
    try {
      const facturas = await this.prisma.factura.findMany({
        where: {
          factura_producto: {
            some: {
              producto_id: id,
            },
          },
        },
        include: {
          factura_producto: true, // Incluir los productos relacionados en la factura (opcional)
        },
      });

      return facturas;
    } catch (error) {
      console.error('Error al buscar facturas por ID de producto:', error);
      throw error; // Opcional: relanzar el error para manejarlo en un nivel superior
    }
  }
}
