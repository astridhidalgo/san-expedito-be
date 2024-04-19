import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaClient) {}
  create(createClienteDto: CreateClienteDto, tx: any) {
    const connect = tx ? tx : this.prisma;
    return connect.cliente.create({
      data: {
        cedula: createClienteDto.cedula,
        nombre: createClienteDto.nombre,
        apellido: createClienteDto.apellido,
      },
    });
  }

  findAll() {
    return `This action returns all clientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  finClienteByCedula(ci: string) {
    return this.prisma.cliente.findFirst({ where: { cedula: ci } });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
