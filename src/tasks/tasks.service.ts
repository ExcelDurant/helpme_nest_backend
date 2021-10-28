import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

    async createTask(task:any):Promise<any> {
        const createdTask = new this.TaskModel(task);
        return createdTask.save();
    }
}
