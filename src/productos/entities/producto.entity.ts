import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Factura } from 'src/facturas/entities/factura.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { FacturasProducto } from 'src/facturas_productos/entities/facturas_producto.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
    ManyToOne,
    OneToMany
} from 'typeorm';

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50, unique: true, nullable: false})
    codigo: string;

    @Column({type: "varchar", length: 50, nullable: false})
    nombre: string;

    @Column({type: "text"})
    descripcion: string;

    @Column({type: "int", nullable: false})
    cantidad: number;

    @Column({type: "varchar", length: 5})
    unidad_medida: string;

    @Column({type: "double", nullable: false})
    precio: number;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.producto, {nullable: false})
    proveedor: Proveedor[]

    @ManyToOne(() => Categoria, (categoria) => categoria.producto, {nullable: false})
    categoria: Categoria[]

    @OneToMany(() => FacturasProducto, (facturasProducto) => facturasProducto.factura, {nullable: false})
    facturasProducto: FacturasProducto[]
}
