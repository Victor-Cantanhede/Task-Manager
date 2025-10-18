import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITaskService } from './interfaces/ITaskService';
import { UserResponseDto } from '../user/dtos/UserResponseDto';
import { CreateTaskDto } from './dtos/CreateTaskDto';
import { MasterTaskResponseDto, TaskResponseDto } from './dtos/TaskResponseDto';
import { ITASK_REPOSITORY, type ITaskRepository } from './interfaces/ITaskRepository';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';


@Injectable()
export class TaskService implements ITaskService {

    constructor(
        @Inject(ITASK_REPOSITORY)
        private readonly taskRepository: ITaskRepository
    ) {}


    async create(dto: CreateTaskDto, authenticatedUser: UserResponseDto): Promise<TaskResponseDto> {
        
        const newTask: CreateTaskDto = {
            title: dto.title.toUpperCase(),
            description: dto.description
        };

        const createdTask = await this.taskRepository.create(authenticatedUser.id, newTask);
        return createdTask;
    }


    async getById(taskId: number, authenticatedUser: UserResponseDto): Promise<TaskResponseDto> {

        const task = await this.taskRepository.findById(authenticatedUser.id, taskId);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }


    async getAll(authenticatedUser: UserResponseDto): Promise<Array<TaskResponseDto | MasterTaskResponseDto | null>> {
        const tasks = await this.taskRepository.findAll(
            authenticatedUser.role !== 'MASTER' ? authenticatedUser.id : undefined
        );
        return tasks;
    }


    async updateById(taskId: number, dto: UpdateTaskDto, authenticatedUser: UserResponseDto): Promise<TaskResponseDto> {
        
        const newTaskData: UpdateTaskDto = {
            ...dto,
            title: dto.title?.toUpperCase()
        };

        const updatedTask = await this.taskRepository.findByIdAndUpdate(authenticatedUser.id, taskId, newTaskData);
        return updatedTask;
    }


    async deleteById(taskId: number, authenticatedUser: UserResponseDto): Promise<boolean> {
        
        const deletedTask = await this.taskRepository.deleteById(authenticatedUser.id, taskId);
        return deletedTask;
    }
}
