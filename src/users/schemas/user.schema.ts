import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique:true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  photoUrl: string;

  @Prop()
  languages:string[];

  @Prop()
  is_helper: boolean;

  @Prop()
  created_tasks: number;

  @Prop()
  completed_tasks: number;

  @Prop()
  is_verified: number;

  @Prop()
  reviews_number: number;

  @Prop()
  average_reviews: number;

  @Prop()
  skills: string[];

  @Prop()
  categories: string[];

  @Prop()
  description: string;

  @Prop()
  education: string;

  @Prop()
  cash: number;

  @Prop({default:Date.now})
  registered_on: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
