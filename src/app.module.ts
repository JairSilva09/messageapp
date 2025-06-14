import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { Mensaje } from './mensajes/entities/mensaje/mensaje.entity';
import { Usuario } from './usuarios/entities/usuario/usuario.entity';
import { MensajesService } from './mensajes/mensajes.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'nest',
        password: 'app',
        database: 'sendmeapp',
        entities: [Mensaje,Usuario],
        synchronize: true,
      }
    ),
    TypeOrmModule.forFeature([Mensaje,Usuario]),
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
