import {
	Entity,
	PrimaryColumn,
	Column
} from 'typeorm';

@Entity()
export class Producto {
    @PrimaryColumn({type: "varchar", length: 7})
    id: number;

    @Column({type: "varchar", length: 50})
    nombre: string;

    @Column({type: "text"})
    descripcion: string;

    @Column({type: "int"})
    cantidad: number;

    @Column({type: "double"})
    precio: number;

    @Column({type: "int"})
    proveedores_id: number;

    @Column({type: "int"})
	categoria_id: number;
}
