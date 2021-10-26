import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService:UsersService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(@Body() body) {
        return this.authService.signup(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('users')
    getAllUsers() {
        return this.usersService.findAll();
    }
}
