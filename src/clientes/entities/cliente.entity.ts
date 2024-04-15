import {
	Entity,
	PrimaryGeneratedColumn,
	Column
} from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    nombre: string;

    @Column({type: "varchar", length: 50})
    apellido: string;

    @Column({type: "varchar", length: 10})
    cedula: string;
}
