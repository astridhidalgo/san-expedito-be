import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { Rol } from './enums/rol.enum';
import { Auth } from './decoradores/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  register(@Body() registroDto: CreateUsuarioDto) {
    return this.authService.registro(registroDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
