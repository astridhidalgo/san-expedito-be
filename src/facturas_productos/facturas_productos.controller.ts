import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacturasProductosService } from './facturas_productos.service';
import { CreateFacturasProductoDto } from './dto/create-facturas_producto.dto';
import { UpdateFacturasProductoDto } from './dto/update-facturas_producto.dto';

@Controller('facturas-productos')
export class FacturasProductosController {
  constructor(private readonly facturasProductosService: FacturasProductosService) {}

  @Post()
  create(@Body() createFacturasProductoDto: CreateFacturasProductoDto) {
    const tx = undefined;
    return this.facturasProductosService.create(createFacturasProductoDto.factura_id, createFacturasProductoDto.producto_id, tx);
  }

  @Get()
  findAll() {
    return this.facturasProductosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturasProductosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturasProductoDto: UpdateFacturasProductoDto) {
    return this.facturasProductosService.update(+id, updateFacturasProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturasProductosService.remove(+id);
  }
}
