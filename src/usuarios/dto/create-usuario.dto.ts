import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUsuarioDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasenya: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  rol: string;
}
