import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>
  ) {}

  async create(createProductoDto: CreateProductoDto) {

    const categoriaId = createProductoDto.categoriaId;
    const proveedorId = createProductoDto.proveedorId;

    const categoria = await this.productoRepository
    .createQueryBuilder('producto')
    .leftJoinAndSelect('producto.categoria', 'categoria')
    .where('categoria.id = :categoriaId', { categoriaId })
    .getOne();

  const proveedor = await this.productoRepository
    .createQueryBuilder('producto')
    .leftJoinAndSelect('producto.proveedor', 'proveedor')
    .where('proveedor.id = :proveedorId', { proveedorId })
    .getOne();

    console.log({categoria})
    console.log({proveedor})
  
    //createProductoDto.categoriaId = categoria;
    //createProductoDto.proveedorId = proveedor;
    //const nuevo_producto = this.productoRepository.create(createProductoDto);
    //return await this.productoRepository.save(nuevo_producto);
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
