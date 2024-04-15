import {
	Entity,
	PrimaryColumn,
	Column
} from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryColumn({type: "varchar", length: 20})
    id: number;

    @Column({type: "varchar", length: 255})
    contrasenya: string;
}
