import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mensaje } from 'src/mensajes/entities/mensaje/mensaje.entity';

@Entity()

export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nick: string;  

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(type => Mensaje, mensaje => mensaje.usuario)

    mensajes: Mensaje[]
}