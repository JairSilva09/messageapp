import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateMensajeDto {
  
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly mensaje: string;
}
