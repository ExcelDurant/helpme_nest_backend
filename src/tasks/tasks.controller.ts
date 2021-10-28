import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async signup(@Body() body, @Request() req) {
        body.created_by = req.user._id;
        return this.tasksService.createTask(body);
        // return body;
    }
}
