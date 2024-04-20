import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    return await this.productosService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get('detalle/:id') // Cambiado el patrón de la ruta
  async findProductoById(@Param('id') id: string) {
    console.log('controlador');
    return await this.productosService.findProductoById(Number(id));
  }

  @Get('contador')
  async contadorProductos() {
    return await this.productosService.contadorProductos();
  }

  @Get(':codigo')
  findProductoByCodigo(@Param('codigo') codigo: string) {
    console.log(codigo);
    return this.productosService.findProductoByCodigo(codigo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(Number(id), updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(Number(id));
  }
}
