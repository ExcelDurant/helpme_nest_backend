import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  //  @Prop({ type: mongoose.Types.ObjectId })
   _id: string

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique:true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop()
  sec_phone_number: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop({default:"https://4.bp.blogspot.com/-txKoWDBmvzY/XHAcBmIiZxI/AAAAAAAAC5o/wOkD9xoHn28Dl0EEslKhuI-OzP8_xvTUwCLcBGAs/s1600/2.jpg"})
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

  @Prop({default:0})
  reviews_number: number;

  @Prop({default:0})
  average_reviews: number;

  @Prop()
  skills: string[];

  @Prop()
  job: string;

  @Prop()
  categories: string[];

  @Prop()
  description: string;

  @Prop()
  education: string;

  @Prop()
  birthday: Date;

  @Prop()
  cash: number;

  @Prop({default:Date.now})
  registered_on: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
