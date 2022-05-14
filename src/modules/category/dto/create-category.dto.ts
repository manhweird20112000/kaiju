import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/constants';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsEmpty()
  parentId: number;
}
