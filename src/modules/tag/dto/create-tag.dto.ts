import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/constants';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
