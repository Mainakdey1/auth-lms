import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly  userService: UserService,
        private readonly jwtService: JwtService,
    ) {};
    async registerUser(registerUserDto: RegisterDto) {
        console.log("registerDto", registerUserDto);
        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password, saltRounds);



        const user = await this.userService.createUser({
             ...registerUserDto, password: hash
            });
        const payload = {sub: user?._id};
        const token = await this.jwtService.signAsync(payload);
        console.log(token);
        return {access_token : token};
        }
    }

