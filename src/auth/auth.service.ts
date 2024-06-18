import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RecuperacionContraseniaDto } from '../usuarios/dto/recuperacionContraseña.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registro(registroDto: CreateUsuarioDto) {
    const usuario = await this.usuariosService.findUsuarioByNombre(registroDto.nombreUsuario);
    if (usuario) {
      throw new BadRequestException('usuario ya existe');
    }
    registroDto.contrasenya = await bcryptjs.hash(registroDto.contrasenya, 10);
    return await this.usuariosService.create(registroDto);
  }

  async login({ nombreUsuario, contrasenya, rol }: LoginDto) {
    const usuario = await this.usuariosService.findUsuarioByNombre(nombreUsuario);
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
    return usuario;
  }

  async recuperacion(recuperacionContrasenia: RecuperacionContraseniaDto) {
    const usuario = await this.usuariosService.findUsuarioByNombre(recuperacionContrasenia.nombreUsuario);
    if (!usuario) {
      throw new UnauthorizedException('usuario no existe');
    }
    const nuevaContrasenya = await this.generador();
    //actualizar Usuario
    const contrasenyaActualizar = await bcryptjs.hash(nuevaContrasenya, 10);
    await this.usuariosService.updateRecuperacionContraseniaUsuario(usuario.id, contrasenyaActualizar);
    await this.mailService.sendMail(usuario.email, usuario.nombre, nuevaContrasenya);
    return { mensage: 'ok' };
  }
  async generador(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * max);
    }
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(getRandomInt(charactersLength));
    }
    return result;
  }
}
