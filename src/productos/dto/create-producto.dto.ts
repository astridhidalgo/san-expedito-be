import { IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  codigo: string;

  @IsNotEmpty()
  nombre: string;

  descripcion?: string;

  @IsNotEmpty()
  cantidad: number;

  @IsNotEmpty()
  unidad_medida: string;

  @IsNotEmpty()
  precio: number;

  @IsNotEmpty()
  proveedorId: number | null;

  @IsNotEmpty()
  categoriaId: number | null;
}
