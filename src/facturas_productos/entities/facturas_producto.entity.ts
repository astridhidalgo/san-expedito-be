import {
	Entity,
	PrimaryColumn,
	Column
} from 'typeorm';

@Entity()
export class FacturasProducto {
    @PrimaryColumn({type: "int"})
    facturas_id: number;

    @Column({type: "varchar", length: 7})
    productos_id: number;

    @Column({type: "decimal"})
    cantidad: number;

    @Column({type: "decimal"})
    precio: number;
}
