import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(registroDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: registroDto,
    });
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findUsuarioByNombre(nombreUsuario: string) {
    return this.prisma.usuario.findFirst({ where: { nombreUsuario: nombreUsuario } });
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async updateRecuperacionContraseniaUsuario(usuarioId: number, contrasenya: string) {
    return this.prisma.usuario.update({
      where: {
        id: usuarioId,
      },
      data: { contrasenya: contrasenya },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
