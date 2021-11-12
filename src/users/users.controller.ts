import { Body, Controller, HttpCode, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('become_helper')
    async makeHelper(@Body() body, @Request() req) {
        let updatedUser = await this.usersService.makeHelper(body);
        return updatedUser;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/profile')
    async updateUser(@Body() body, @Request() req) {
        let updatedUser = await this.usersService.updateUser(body);
        return updatedUser;
    }

    // @UseGuards(JwtAuthGuard)
    @Get('helpers')
    async getHelpers(@Body() body, @Request() req) {
        let helpers = await this.usersService.getHelpers(); 
        let helpersListDoc:any = helpers;
        helpersListDoc = helpersListDoc.map(({_doc, ...attributes}) => {
            return _doc;
        });
        let helpersList = helpersListDoc.map(({password, ...attributes}) => {
            return attributes;
        })
        return helpersList;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() params) {
        console.log(params.id);
        const user = await this.usersService.getUserDetails(params.id);
        return user;
    }

}
