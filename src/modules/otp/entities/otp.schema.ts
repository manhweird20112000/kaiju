import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' } })
export class Otp extends Document {
  @Prop()
  identification: string;

  @Prop()
  code: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;
}

export const OtpDocument = SchemaFactory.createForClass(Otp);
