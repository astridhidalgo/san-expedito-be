import {
	Entity,
	PrimaryGeneratedColumn,
	Column
} from 'typeorm';

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int"})
    clientes_id: number;

    @Column({type: "decimal"})
    total: number;

    @Column({type: "int"})
    tipo_pago_id: number;

    @Column({type: "varchar", length: 20})
    usuarios_id: string;

    @Column({type: "datetime"})
    fecha_creacion: string;
}
