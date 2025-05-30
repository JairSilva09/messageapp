import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';


@Injectable()
export class MensajesService {
    constructor(
    @InjectRepository(Mensaje)
    private mensajesRepository: Repository<Mensaje>,
  ) {}

  createMensaje(MensajeNuevo: CreateMensajeDto): Promise<>{

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
