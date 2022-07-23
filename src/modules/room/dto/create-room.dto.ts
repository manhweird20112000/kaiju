import { IsNotEmpty, IsNumber } from 'class-validator';
import { TypeRoom } from 'src/constants';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  roomType: TypeRoom;
}
