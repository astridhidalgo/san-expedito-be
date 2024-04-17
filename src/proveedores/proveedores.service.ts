import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaClient) {}
  create(createProveedoreDto: CreateProveedoreDto) {
    return this.prisma.proveedor.create({ data: { nombre: createProveedoreDto.nombre } });
  }

  findAll() {
    return this.prisma.proveedor.findMany({ orderBy: { id: 'asc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
