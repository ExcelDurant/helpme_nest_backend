import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GoogleService } from '../google/google.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService, private googleService:GoogleService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createTask(@Body() body, @Request() req) {
        body.created_by = req.user._id;
        return this.tasksService.createTask(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('locate')
    async taskAddress(@Query('latitude') latitude, @Query('longitude') longitude) {
        let results = await this.googleService.getAddress(latitude, longitude);
        return results;
    }

    @UseGuards(JwtAuthGuard)
    @Post('propose')
    async proposeTask(@Body() body, @Request() req) {
        let proposer = req.user._id;
        let taskId = body.task_id;
        return this.tasksService.addProposal(proposer, taskId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('assign')
    async assignTask(@Body() body, @Request() req) {
        let creator = req.user._id;
        let proposer = body.proposer_id;
        let taskId = body.task_id;
        return this.tasksService.assignTask(creator, proposer, taskId);
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
