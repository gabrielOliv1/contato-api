import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class Contact {
  id?: number;

  @IsNotEmpty()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  telefone_celular: string;

  @IsOptional()
  @IsString()
  @Length(9, 9)
  telefone_recado?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;
} 