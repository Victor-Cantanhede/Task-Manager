import type { UserResponseDto } from '../../user/dtos/user.service.dtos';


export interface CreateTaskDto {
    title: string;
    description: string;
}

export interface TaskResponseDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface MasterTaskResponseDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;

    user: UserResponseDto;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}

export type TaskStatus = 'andamento' | 'concluída' | 'pendente';