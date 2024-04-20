import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  codigo: string;
  nombre: string;
  cantidad: number;
  precio: number;
  unidad_medida: string;
  proveedorId: number;
  categoriaId: number;
}
