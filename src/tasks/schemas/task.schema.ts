import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TaskDocument = Task & Document;
interface Address {
    country: string;
    city: string;
    street: string;
}

@Schema()
export class Task {



    _id: string
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string[];

    @Prop({ type: { country: { type: String }, city: { type: String }, street: { type: String } } })
    address: {
        country: string;
        city: string;
        street: string;
    };

    @Prop({ type: { latitude: { type: String }, longitude: { type: String } } })
    location: {
        latitude:string;
        longitude:string;
    };

    @Prop({ default: Date.now })
    start_date: Date;

    @Prop()
    end_date: Date;

    @Prop({ required: true })
    reward: number;

    @Prop()
    pictures: string[];

    @Prop({ default: 0 })
    proposals: number;

    @Prop({ default:[] })
    proposers: User[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assigned_to: User;

    @Prop()
    status: string;

    @Prop()
    is_completed: boolean;

    @Prop({ default: Date.now })
    created_on: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    created_by: User;
}


export const TaskSchema = SchemaFactory.createForClass(Task);
