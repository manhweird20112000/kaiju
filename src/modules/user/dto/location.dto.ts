import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}
