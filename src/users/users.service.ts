import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User,UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    private readonly users = [
        {
            userId: 1,
            email:'john@gmail.com',
            password: 'changeme',
        },
        {
            userId: 2,
            email: 'maria@gmail.com',
            password: 'guess',
        },
    ];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({email:email})
        return user;
        // return this.users.find(user => user.email === email);
    }

    async findAll(): Promise<User> {
        const users = await this.userModel.findOne({email:"gnopaexcel@yahoo.fr"});
        return users;
      }
}
