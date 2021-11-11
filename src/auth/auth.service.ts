import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        const { password, ...result } = user;
        return {
            access_token: this.jwtService.sign(payload),
            payload: payload,
            user:result
        };
    }

    async signup(user: User) {
        const saltOrRounds = 10;
        const hashedPass = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hashedPass;
        const createdUser = await this.usersService.createUser(user);
        const { password, ...result } = createdUser;
        const { _id, email } = createdUser;
        const payload = {
            sub: _id,
            email: email
        };
        let signedUser = result._doc;
        delete signedUser.password;
        return {
            access_token: this.jwtService.sign(payload),
            user: signedUser as User
        }
    }
}
