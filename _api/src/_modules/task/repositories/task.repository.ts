import { Injectable, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { DbClient } from 'src/_db/db.service';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { MasterTaskResponseDto, TaskResponseDto } from '../dtos/TaskResponseDto';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';


@Injectable()
export class TaskRepository implements ITaskRepository {
    
    constructor(private readonly DbClient: DbClient) {}


    async create(userId: number, dto: CreateTaskDto): Promise<TaskResponseDto> {
        const createdTask = await this.DbClient.task.create({
            data: { ...dto, userId }
        })
        .then(task => new TaskResponseDto(task));

        return createdTask;
    }


    async findById(userId: number, taskId: number): Promise<TaskResponseDto | null> {
        const task = await this.DbClient.task.findUnique({
            where: {
                id: taskId,
                userId: userId
            }
        })
        .then(task => task ? new TaskResponseDto(task) : null);

        return task;
    }


    async findAll(userId: number | undefined): Promise<Array<TaskResponseDto | MasterTaskResponseDto | null>> {

        if (userId) {
            const tasks = await this.DbClient.task.findMany({ where: { userId } }).then(tasks =>
                tasks.map(task => new TaskResponseDto(task))
            );
            return tasks;

        } else {
            const tasks = await this.DbClient.task.findMany({ include: { user: true } }).then(tasks =>
                tasks.map(task => new MasterTaskResponseDto(task, task.user))
            );
            return tasks;
        }
    }


    async findByIdAndUpdate(userId: number, taskId: number, dto: UpdateTaskDto): Promise<TaskResponseDto> {
        const task = await this.findById(userId, taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        const updatedTask = await this.DbClient.task.update({
            where: { id: taskId },
            data: dto
        })
        .then(t => new TaskResponseDto(t));

        return updatedTask;
    }


    async deleteById(userId: number, taskId: number): Promise<boolean> {
        const task = await this.findById(userId, taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        const deletedTask = await this.DbClient.task.delete({
            where: {
                id: taskId,
                userId: userId
            }
        });

        return !!deletedTask;
    }
}