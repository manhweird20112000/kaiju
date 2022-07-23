import { TypeMedia } from 'src/constants';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsEnum(TypeMedia, { each: true })
  type: TypeMedia;
}
