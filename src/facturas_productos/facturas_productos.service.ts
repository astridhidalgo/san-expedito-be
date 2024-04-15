import { Injectable } from '@nestjs/common';
import { CreateFacturasProductoDto } from './dto/create-facturas_producto.dto';
import { UpdateFacturasProductoDto } from './dto/update-facturas_producto.dto';

@Injectable()
export class FacturasProductosService {
  create(createFacturasProductoDto: CreateFacturasProductoDto) {
    return 'This action adds a new facturasProducto';
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
