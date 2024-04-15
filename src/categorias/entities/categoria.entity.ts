import {
	Entity,
	PrimaryGeneratedColumn,
	Column
} from 'typeorm';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    nombre: string;
}
