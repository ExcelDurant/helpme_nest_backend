import { Body, Controller, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

}
