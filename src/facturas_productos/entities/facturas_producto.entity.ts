import { Factura } from 'src/facturas/entities/factura.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
	Entity,
	PrimaryColumn,
	Column,
    ManyToOne
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

    @ManyToOne(() => Producto, (producto) => producto.facturasProducto)
    producto: Producto;

    @ManyToOne(() => Factura, (factura) => factura.facturasProducto)
    factura: Factura;
}
