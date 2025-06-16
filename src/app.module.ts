import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { Mensaje } from './mensajes/entities/mensaje/mensaje.entity';
import { MensajesService } from './mensajes/mensajes.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigService],
         useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_NAME'),
          entities: [Mensaje, Usuario],
          synchronize: true,
        }),
      }
    ),
    TypeOrmModule.forFeature([Mensaje,Usuario]),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
