import { Body, Controller, Post, Get, Put, Delete, Res, HttpStatus, Param, UseGuards, Req } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto/create-mensaje-dto';
import { UpdateMensajeDto } from './dto/create-mensaje-dto/update-mensajes-dto';
import { MensajesService } from './mensajes.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('mensajes')
export class MensajesController {
    
    constructor(private readonly mensajesService: MensajesService) {}

    @UseGuards(AuthGuard)
    @Post()
    createPost(@Body() createMensajeDTO: CreateMensajeDto, @Res() response){
        this.mensajesService.createMensaje(createMensajeDTO).then(
            mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje)
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'No se creo el mensaje'
                })
            }
        )
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
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
    update(@Body() update: UpdateMensajeDto,@Res() response,@Param('id') idMensaje: number, @Req() req){
        this.mensajesService.updateMensaje(idMensaje,update,req.user).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje)
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error al actualizar mensaje'
                })
            }
        )
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Res() response,@Param('id') idMensaje: number, @Req() req){
        this.mensajesService.remove(idMensaje,req.user).then(
            res => {
                response.status(HttpStatus.OK).json(res)
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({
                    mensaje: 'Error al eliminar mensaje'
                })
            }
        )
    }
}
