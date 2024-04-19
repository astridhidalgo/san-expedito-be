import { CreateClienteDto } from '../../clientes/dto/create-cliente.dto';

export class CreateFacturaDto {
  cliente: CreateClienteDto;
  numero_factura: string;
  fecha: string;
  total: string;
  productos: ProductoFacturaDto[];
}

export class ProductoFacturaDto {
  id: string;
  codigo: string;
  nombre: string;
  cantidad: string;
  precio: string;
}
