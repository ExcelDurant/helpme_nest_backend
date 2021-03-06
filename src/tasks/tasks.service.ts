import { BadRequestException,Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

    // creates a new task
    async createTask(task:any):Promise<any> {
        const createdTask = new this.TaskModel(task);
        return createdTask.save();
    }

    async getTaskId(id:string) {
        const task = await this.TaskModel.findById(id);
        return task;
    }

    // gets and paginate tasks
    async getTasks(page?:number):Promise<any> {
        let perPage = 20;
        let currentPage = page;
        const tasks = await this.TaskModel.find()
        // .sort({name:1}).limit(perPage).skip(perPage * currentPage);
        return tasks;
    }

    // get user tasks
    async getUserTasks(creator:any):Promise<any> {
        const tasks = await this.TaskModel.find({created_by:creator})
        return tasks;
    }

    // adds a proposal to the task
    async addProposal(proposer, taskId:string) {
        let task = await this.TaskModel.findById(taskId);
        if(task.proposers.includes(proposer)) {
            throw new BadRequestException('you are already a proposer');
        }
        task.proposals += 1;
        task.proposers.push(proposer);
        task = await task.save();
        return task;

    }

    async assignTask(creator, proposer, taskId:string) {
        let task = await this.TaskModel.findById(taskId);
        if(task.created_by._id != creator){
            throw new BadRequestException('you are not the task creator');
        }
        if(task.assigned_to != null) {
            throw new BadRequestException('someone has already been assigned to this task');
        }
        task.assigned_to = proposer;
        task.status = "assigned";
        task = await task.save();
        return task;
    }

    async updateTask(task, creator) {
        if(task.created_by != creator){
            throw new BadRequestException('you are not the task creator');
        }
        let updatedTask = await this.TaskModel.findByIdAndUpdate(task._id, task);
        updatedTask= await this.TaskModel.findById(task._id);
        return updatedTask;
    }

    async deleteTask(task, creator) {
        if(task.created_by != creator){
            throw new BadRequestException('you are not the task creator');
        }
        let deletedTask = await this.TaskModel.findOneAndRemove({_id:task._id});
        return deletedTask;
    }
}
