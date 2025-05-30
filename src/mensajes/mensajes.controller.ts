import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';

@Controller('mensajes')
export class MensajesController {
    @Post()
    createPost(@Body() createMensajeDTO: CreateMensajeDto){
        return 'mensaje creado';
    }

    @Get()
    getAllmensajes(){
        return 'lista de mensajes';
    }

    @Put(':id')
    update(@Body() update: CreateMensajeDto){
        return 'mensaje actualizado';
    }

    @Delete(':id')
    delete(){
        return 'mensaje eliminado';
    }
}
