import { Body, Controller, Post, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    
    constructor(private mensajesService: MensajesService) {}

    @Post()
    createPost(@Body() createMensajeDTO: CreateMensajeDto, @Res() response){
        this.mensajesService.createMensaje(createMensajeDTO).then(
            mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje)
            }
        ).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'No se creo el mensaje'
                })
            }
        )
    }

    @Get()
    getAllmensajes(@Res() response){
        this.mensajesService.findAll().then(
            mensajeList => {
                response.status(HttpStatus.OK).json(mensajeList)
            }
        ).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({
                mensaje: 'Error en la obtencion de mensajes'
            })
        })
    }

    @Get(':id')
    findOne(@Param('id') id: number,@Res() response) {
        this.mensajesService.findOne(id)
        .then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje)
            }
        ).catch(
             () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Erro al traer el mensaje'
                })
            }
        )
    }
    
    @Put(':id')
    update(@Body() update: CreateMensajeDto,@Res() response,@Param('id') idMensaje: number){
        this.mensajesService.updateMensaje(idMensaje,update).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje)
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la actualizacion de mensaje'
                })
            }
        )
    }

    @Delete(':id')
    delete(@Res() response,@Param('id') idMensaje: number){
        this.mensajesService.remove(idMensaje).then(
            res => {
                response.status(HttpStatus.OK).json(res)
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error en la eliminacion de mensaje'
                })
            }
        )
    }
}
