import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { IAuthService } from './interfaces/IAuthService';
import { IUSER_SERVICE, type IUserService } from '../user/interfaces/IUserService';
import { UserResponseDto } from '../user/dtos/UserResponseDto';
import { LoginResponseDto } from './dtos/LoginResponseDto';


@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(IUSER_SERVICE)
        private readonly userService: IUserService,
        private readonly jwtService: JwtService
    ) {}


    async login(email: string, password: string): Promise<LoginResponseDto> {
        
        const user = await this.userService.getByEmail(email).catch(() => {
            throw new NotFoundException('Invalid or unregistered email');
        });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payloadUserToken: UserResponseDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        const token = await this.jwtService.signAsync(payloadUserToken, {
            expiresIn: '10m'
        });

        return new LoginResponseDto(payloadUserToken, token);
    }
}
