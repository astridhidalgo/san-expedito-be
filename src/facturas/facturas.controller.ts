import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  async create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  findAll(@Query('orderBy') orderBy: string, @Query('fechaInicio') fechaInicio: string, @Query('fechaFin') fechaFin: string) {
    const orden = 'desc';
    return this.facturasService.findAll(orderBy, orden, fechaInicio, fechaFin);
  }

  @Get('ultimaFactura')
  finUltimoNumFactura() {
    return this.facturasService.finUltimoNumFactura();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturasService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturasService.remove(+id);
  }
}
