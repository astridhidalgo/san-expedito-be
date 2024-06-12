import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: { nombre: string; contrasenya: string }, rol: string) {
    return this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        contrasenya: data.contrasenya,
        rol: rol,
      },
    });
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findUsuarioByNombre(nombre: string) {
    return this.prisma.usuario.findFirst({ where: { nombre: nombre } });
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
