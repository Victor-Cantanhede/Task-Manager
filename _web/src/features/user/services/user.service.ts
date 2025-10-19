import { api, request } from '../../../api/api';
import type { CreateUserDto, UserResponseDto } from '../dtos/user.service.dtos';


export const userService = {
    async create(dto: CreateUserDto) {
        return await request<UserResponseDto>(() => api.post('/user', dto));
    }
};