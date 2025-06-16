import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { UpdateMensajeDto } from './dto/create-mensaje-dto/update-mensajes-dto';
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

  async updateMensaje(id: number,updateMensajeDto: UpdateMensajeDto,user: any): Promise<Mensaje> {
    const mensajeUpdate = await this.mensajesRepository.findOneBy({ id });
    if(!mensajeUpdate){
      throw new NotFoundException(`No se encontró el mensaje con id ${id}`);
    }

    if (mensajeUpdate && mensajeUpdate.nick !== user.nick) {
      throw new ForbiddenException('No tienes permiso para editar este mensaje');
    }
    mensajeUpdate.mensaje = updateMensajeDto.mensaje;
    return await this.mensajesRepository.save(mensajeUpdate);
  }

  findAll(): Promise<Mensaje[]> {
    return this.mensajesRepository.find();
  }

  findOne(id: number): Promise<Mensaje | null> {
    return this.mensajesRepository.findOneBy({ id });
  }

  async remove(id: number,usuario: any): Promise<void> {
    const mensaje = await this.mensajesRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (mensaje && mensaje.nick !== usuario.nick) {
      throw new ForbiddenException('No tienes permiso para borrar este mensaje');
    }
    if (!mensaje) {
      throw new NotFoundException('Mensaje no encontrado');
    }
    await this.mensajesRepository.delete(id);
  }
}
