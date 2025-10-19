import type { UserResponseDto } from './user.service.dtos';


export interface AuthUserDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    user: UserResponseDto;
    token: string;
}