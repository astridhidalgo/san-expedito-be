import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'nombre es un string' })
  @MinLength(1, { message: 'nombre no puede estar vacio' })
  nombreUsuario: string;
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'contrasenya es un string' })
  @MinLength(1, { message: 'contrasenya no puede estar vacio' })
  contrasenya: string;
  rol: string;
}
