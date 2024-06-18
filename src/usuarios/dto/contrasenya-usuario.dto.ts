import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ContrasenyaUsuario {
  contrasenyaActual: string;
  contrasenyaNueva: string;
}
