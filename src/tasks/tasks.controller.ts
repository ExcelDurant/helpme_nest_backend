import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}

    @Post('create')
    async signup(@Body() body) {
        return this.tasksService.createTask(body);
        // return body;
    }
}
