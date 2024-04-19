import { Injectable } from '@nestjs/common';
import { CreateFacturasProductoDto } from './dto/create-facturas_producto.dto';
import { UpdateFacturasProductoDto } from './dto/update-facturas_producto.dto';
import { ClientesService } from '../clientes/clientes.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FacturasProductosService {
  constructor(private prisma: PrismaClient) {}
  async create(facturaId: number, productoId: number, tx: any): Promise<void> {
    const connect = tx ? tx : this.prisma;
    try {
      await connect.factura_Producto.create({
        data: {
          factura_id: facturaId,
          producto_id: productoId,
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

  update(id: number, updateFacturasProductoDto: UpdateFacturasProductoDto) {
    return `This action updates a #${id} facturasProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturasProducto`;
  }
}
