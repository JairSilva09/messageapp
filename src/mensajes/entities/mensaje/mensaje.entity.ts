import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Usuario} from '../../../usuarios/entities/usuario.entity'

@Entity()

export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    mensaje: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.mensajes)
    usuario: Usuario
}
