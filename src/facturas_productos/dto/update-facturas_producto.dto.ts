import { PartialType } from '@nestjs/mapped-types';
import { CreateFacturasProductoDto } from './create-facturas_producto.dto';

export class UpdateFacturasProductoDto extends PartialType(CreateFacturasProductoDto) {}
