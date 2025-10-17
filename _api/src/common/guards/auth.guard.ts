import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/_modules/user/dtos/UserResponseDto';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();
        const token = req.cookies?.['access_token'];

        if (!token) {
            throw new UnauthorizedException('User not authenticated! please log in and try again');
        }

        await this.jwtService.verifyAsync(token).then((payload: UserResponseDto) => {
            req.user = payload;
        })
        .catch(() => {
            throw new UnauthorizedException('User not authenticated! please log in and try again');
        });

        return true;
    }
}