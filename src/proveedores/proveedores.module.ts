import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({

  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
