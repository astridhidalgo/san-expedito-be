import { Factura } from 'src/facturas/entities/factura.entity';
import {
	Entity,
	PrimaryColumn,
	Column,
    OneToMany
} from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryColumn({type: "varchar", length: 20})
    id: number;

    @Column({type: "varchar", length: 255})
    contrasenya: string;

    @OneToMany(() => Factura, (factura) => factura.usuario)
    factura: Factura[];
}
