import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ContrasenyaUsuario } from './dto/contrasenya-usuario.dto';
import { UpdateProductoDto } from '../productos/dto/update-producto.dto';
import { usuario } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(registroDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: registroDto,
    });
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany();
    const result = [];
    for (const usuario of usuarios) {
      result.push({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        usuario: usuario.nombreUsuario,
        correo: usuario.email,
        rol: usuario.rol,
      });
    }
    return result;
  }

  findUsuarioByNombre(nombreUsuario: string) {
    return this.prisma.usuario.findFirst({ where: { nombreUsuario: nombreUsuario } });
  }

  async findOne(id: number): Promise<usuario> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async updateRecuperacionContraseniaUsuario(usuarioId: number, contrasenya: string) {
    return this.prisma.usuario.update({
      where: {
        id: usuarioId,
      },
      data: { contrasenya: contrasenya },
    });
  }

  async update(id: number, contrasenyaUsuario: ContrasenyaUsuario) {
    console.log(id);
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new BadRequestException('Usuario no existe');
    }

    const isContrasenyaValida = await bcryptjs.compare(contrasenyaUsuario.contrasenyaActual, usuario.contrasenya);
    if (!isContrasenyaValida) {
      throw new UnauthorizedException('Contraseña actual no coincide');
    }

    contrasenyaUsuario.contrasenyaNueva = await bcryptjs.hash(contrasenyaUsuario.contrasenyaNueva, 10);
    const result = await this.prisma.usuario.update({
      where: { id: id },
      data: { contrasenya: contrasenyaUsuario.contrasenyaNueva },
    });
    return result;
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id: id } });
  }
}
