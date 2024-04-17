import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;
}
