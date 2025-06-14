import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje/mensaje.entity';
import { Mensaje as mns } from 'src/interfaces/mensaje.interface';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';


@Injectable()
export class MensajesService {
    constructor(
    @InjectRepository(Mensaje)
    private mensajesRepository: Repository<Mensaje>,
  ) {}

  createMensaje(MensajeNuevo: CreateMensajeDto): Promise<Mensaje>{
    const nuevo = new Mensaje();
    nuevo.mensaje = MensajeNuevo.mensaje;
    nuevo.nick = MensajeNuevo.nick;
    return this.mensajesRepository.save(nuevo);

  }

  async updateMensaje(id: number,MensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
    const mensajeUpdate = await this.mensajesRepository.findOneBy({ id });
    if(!mensajeUpdate){
      throw new NotFoundException(`No se encontró el mensaje con id ${id}`);
    }
    mensajeUpdate.nick = MensajeActualizar.nick;
    mensajeUpdate.mensaje = MensajeActualizar.mensaje;
    return await this.mensajesRepository.save(mensajeUpdate);
  }

  findAll(): Promise<Mensaje[]> {
    return this.mensajesRepository.find();
  }

  findOne(id: number): Promise<Mensaje | null> {
    return this.mensajesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.mensajesRepository.delete(id);
  }
}
