import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mensaje } from "src/mensajes/entities/mensaje/mensaje.entity";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true, nullable: false})
    nick: string;
    @Column({unique: true,nullable: false})
    email: string;
    @Column()
    password: string;
    @Column({default: 'user'})
    rol: string;

    @OneToMany(type => Mensaje, mensaje => mensaje.usuario)
    mensajes: Mensaje[];
}
