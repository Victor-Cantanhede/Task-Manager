import { api, request } from '../../../api/api';
import type { CreateTaskDto, MasterTaskResponseDto, TaskResponseDto, UpdateTaskDto } from '../dtos/task.service.dtos';


export const taskService = {

    async create(dto: CreateTaskDto) {
        return await request<TaskResponseDto>(() => api.post('/task', dto));
    },

    async getAll() {
        return await request<Array<TaskResponseDto | MasterTaskResponseDto | null>>(() => api.get('/task'));
    },

    async updateById(taskId: number, dto: UpdateTaskDto) {
        return await request<TaskResponseDto | MasterTaskResponseDto>(() => api.put(`/task/${taskId}`, dto));
    },

    async deleteById(taskId: number) {
        return await request<boolean>(() => api.delete(`/task/${taskId}`));
    }
};