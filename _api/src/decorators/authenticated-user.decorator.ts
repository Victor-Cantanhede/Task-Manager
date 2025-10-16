import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponseDto } from 'src/_modules/user/dtos/UserResponseDto';


export const AuthenticatedUser = createParamDecorator(
    (data: keyof any, context: ExecutionContext) => {
        
        const req = context.switchToHttp().getRequest();
        const user = req.user as UserResponseDto;

        return data ? user?.[data] : user;
    }
);