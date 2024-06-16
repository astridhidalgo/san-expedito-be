import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { Rol } from './enums/rol.enum';
import { Auth } from './decoradores/auth.decorator';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RecuperacionContraseniaDto } from '../usuarios/dto/recuperacionContraseña.dto';

@Controller('usuarios')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
  register(@Body() registroDto: CreateUsuarioDto) {
    return this.authService.registro(registroDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('recuperacion')
  recuperarContraseña(@Body() recuperacionContrasenia: RecuperacionContraseniaDto) {
    return this.authService.recuperacion(recuperacionContrasenia);
  }

  // @Get('perfil')
  // @Roles(Rol.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // perfil(@Request() req) {
  //   return req.usuario;
  // }

  @Get('perfil')
  @Auth(Rol.ADMIN)
  perfil(@Request() req) {
    return req.usuario;
  }
}
