import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TypeRequest } from 'src/constants';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsEnum(TypeRequest)
  @IsNotEmpty()
  status: TypeRequest;
}
