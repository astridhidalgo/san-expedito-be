import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FacturasService {
  constructor(private prisma: PrismaClient) {}
  create(createFacturaDto: CreateFacturaDto) {
    return 'This action adds a new factura';
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
