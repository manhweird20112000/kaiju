import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import { Gender } from 'src/constants';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(6)
  password: string;

  gender: Gender;
}
