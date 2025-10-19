import { api, request } from '../../../api/api';
import type { CreateTaskDto, MasterTaskResponseDto, TaskResponseDto } from '../dtos/task.service.dtos';


export const taskService = {

    async create(dto: CreateTaskDto) {
        return await request<TaskResponseDto>(() => api.post('/task', dto));
    },

    async getAll() {
        return await request<Array<TaskResponseDto | MasterTaskResponseDto | null>>(() => api.get('task'));
    }
};