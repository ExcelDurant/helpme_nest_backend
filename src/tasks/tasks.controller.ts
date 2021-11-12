import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GoogleService } from '../google/google.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService, private googleService: GoogleService) { }

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
    @Post('update')
    async updateTask(@Body() body, @Request() req) {
        let creator = req.user._id;
        let updatedTask = await this.tasksService.updateTask(body, creator);
        return updatedTask;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    @HttpCode(200)
    async deleteTask(@Body() body, @Request() req) {
        let creator = req.user._id;
        let deletedTask = await this.tasksService.deleteTask(body, creator);
        return 'task successfully deleted';
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
        if (isNaN(page)) {
            const tasks = await this.tasksService.getTasks();
            return tasks;
        } else {
            const tasks = await this.tasksService.getTasks(page);
            return tasks;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    async getUserTasks(@Request() req) {
        let creator = req.user._id;
        const tasks = await this.tasksService.getUserTasks(creator);
        return tasks;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() params) {
        console.log(params.id);
        const task = await this.tasksService.getTaskId(params.id)
        return task;
    }

}
