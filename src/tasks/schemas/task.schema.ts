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
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    category: string[];

    @Prop({ type: { country: { type: String }, city: { type: String }, street: { type: String } } })
    address: {
        country: string;
        city: string;
        street: string;
    };

    @Prop()
    location: string;

    @Prop({ default: Date.now })
    start_date: Date;

    @Prop()
    end_date: Date;

    @Prop()
    reward: number;

    @Prop()
    pictures: string[];

    @Prop()
    proposals: number;

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
