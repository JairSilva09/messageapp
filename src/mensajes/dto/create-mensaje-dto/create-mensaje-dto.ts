import { IsString, IsNotEmpty } from 'class-validator';
export class CreateMensajeDto {
  @IsString()
  @IsNotEmpty()
  readonly nick: string;

  @IsString()
  @IsNotEmpty()
  readonly mensaje: string;
}
