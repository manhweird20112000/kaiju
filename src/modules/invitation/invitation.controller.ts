import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseHttpType } from 'src/constants';
import { ValidationPipe } from 'src/utils/validation/validation.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/request-you')
  async requestYou(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto,
  ) {
    try {
      const user: any = req.user;
      const data: ResponseHttpType<Invitation> =
        await this.invitationService.requestYou(user, createInvitationDto);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/set-request-you/:id')
  async setRequestYou(
    @Res() res: Response,
    @Req() req: Request,
    @Body(new ValidationPipe()) updateInvitationDto: UpdateInvitationDto,
    @Param('id') id: number,
  ) {
    try {
      const data: ResponseHttpType<Invitation> =
        await this.invitationService.setRequestYou(id, updateInvitationDto);
      return res.status(HttpStatus.OK).json({ ...data });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
