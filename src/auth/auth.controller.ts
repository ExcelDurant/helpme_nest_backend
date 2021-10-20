import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() userDto:UserDto) {
        return userDto;
    }

    @Post('login')
    login() {
        return 'this logs  in a new user'
    }

    @Post('logout')
    logout() {
        return 'this will logout the user'
    }
}
