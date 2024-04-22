import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async registro({ nombre, contrasenya }: CreateUsuarioDto) {
    const usuario = await this.usuariosService.findUsuarioByNombre(nombre);
    if (usuario) {
      throw new BadRequestException('usuario ya existe');
    }
    return await this.usuariosService.create({ nombre, contrasenya: await bcryptjs.hash(contrasenya, 10) });
  }

  async login({ nombre, contrasenya, rol }: LoginDto) {
    const usuario = await this.usuariosService.findUsuarioByNombre(nombre);
    if (!usuario) {
      throw new UnauthorizedException('usuario no existe');
    }

    if (usuario.rol !== rol) {
      throw new UnauthorizedException('rol no es correcto');
    }
    const isContrasenyaValida = await bcryptjs.compare(contrasenya, usuario.contrasenya);
    if (!isContrasenyaValida) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { usuarioId: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
