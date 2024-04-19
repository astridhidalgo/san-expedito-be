import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaClient } from '@prisma/client';
import { ClientesService } from '../clientes/clientes.service';
import { FacturasProductosService } from '../facturas_productos/facturas_productos.service';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class FacturasService {
  constructor(
    private prisma: PrismaClient,
    private readonly clientesService: ClientesService,
    private readonly facturasProductos: FacturasProductosService,
    private readonly productosService: ProductosService,
  ) {}
  async create(createFacturaDto: CreateFacturaDto) {
    console.log(createFacturaDto);
    try {
      await this.prisma.$transaction(async (tx) => {
        let cliente = await this.clientesService.finClienteByCedula(createFacturaDto.cliente.cedula);
        if (!cliente) {
          cliente = await this.clientesService.create(createFacturaDto.cliente, tx);
        }
        const usuario_id = 2;
        const factura = await tx.factura.create({
          data: {
            cliente_id: cliente.id,
            usuario_id: usuario_id,
            total: Number(createFacturaDto.total),
            fecha_creacion: new Date(createFacturaDto.fecha),
            numero_factura: createFacturaDto.numero_factura,
          },
        });
        for (const producto of createFacturaDto.productos) {
          await this.facturasProductos.create(factura.id, Number(producto.id), tx);
          const stockProducto = await this.productosService.findOne(Number(producto.id));
          const stockCalculado = stockProducto.cantidad - Number(producto.cantidad);
          await this.productosService.updateStock(Number(producto.id), stockCalculado, tx);
        }
        console.log('factura creada con  exito');
      });
    } catch (error) {
      console.error('Error al ejecutar la transacción:', error);
      throw new Error('Error al ejecutar la transacción');
    }
  }

  findAll() {
    return this.prisma.factura.findMany({
      include: {
        Factura_Producto: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} factura`;
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }

  async finUltimoNumFactura() {
    try {
      // Obtener el último registro más reciente de la tabla factura
      const ultimoRegistro = await this.prisma.factura.findFirst({
        orderBy: {
          // Ordenar de forma descendente por el campo que representa el momento de creación
          fecha_creacion: 'desc',
        },
      });

      if (ultimoRegistro) {
        // Si se encontró el último registro, devolver el número de factura de ese registro
        return { numero_factura: ultimoRegistro.numero_factura };
      } else {
        // Si no se encontraron registros, mostrar un mensaje de error
        console.error('No se encontraron registros en la tabla factura.');
        return null;
      }
    } catch (error) {
      // Si ocurre un error durante la consulta, mostrar un mensaje de error
      console.error('Error al obtener el último número de factura:', error);
      return null;
    }
  }
}
