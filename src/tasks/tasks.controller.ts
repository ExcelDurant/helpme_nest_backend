import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createTask(@Body() body, @Request() req) {
        body.created_by = req.user._id;
        return this.tasksService.createTask(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('propose')
    async proposeTask(@Body() body, @Request() req) {
        let proposer = req.user._id;
        let taskId = body.task_id;
        return this.tasksService.addProposal(proposer, taskId);
    }

    @Get('retrieve')
    async getTasks(@Query('page') page) {
        page = parseInt(page);
        if(isNaN(page)) {
            const tasks = await this.tasksService.getTasks();
            return tasks;
        } else {
            const tasks = await this.tasksService.getTasks(page);
            return tasks;
        }  
        
    }
}
