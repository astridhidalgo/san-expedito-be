import { Producto } from 'src/productos/entities/producto.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
    OneToMany
} from 'typeorm';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    nombre: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    producto: Producto;
}
