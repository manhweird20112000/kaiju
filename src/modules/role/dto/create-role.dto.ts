import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/constants';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @IsString()
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  level: number;
}
