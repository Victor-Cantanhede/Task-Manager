import { api, request } from '../../../api/api';
import type { AuthUserDto, LoginResponseDto } from '../dtos/auth.service.dtos';


export const authService = {
    async login(dto: AuthUserDto) {
        return await request<LoginResponseDto>(() => api.post('/auth/login', dto));
    }
};