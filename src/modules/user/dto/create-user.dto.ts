import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
