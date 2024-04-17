import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';
import { Rol } from '../enums/rol.enum';

export function Auth(rol: Rol) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RolesGuard));
}
