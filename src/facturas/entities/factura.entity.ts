import { Cliente } from 'src/clientes/entities/cliente.entity';
import { FacturasProducto } from 'src/facturas_productos/entities/facturas_producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
    OneToMany,
    ManyToOne
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

    @Column({type: "datetime"})
    fecha_creacion: string;

    @OneToMany(() => FacturasProducto, (facturasProducto) => facturasProducto.factura)
    facturasProducto: FacturasProducto[]

    @ManyToOne(() => Cliente, (cliente) => cliente.factura)
    cliente: Cliente;

    @ManyToOne(() => Usuario, (usuario) => usuario.factura)
    usuario: Usuario;
}
