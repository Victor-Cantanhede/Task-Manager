import { TaskEntity, TaskStatus, UserEntity } from 'src/_db/entities/db.entities';
import { UserResponseDto } from 'src/_modules/user/dtos/UserResponseDto';


export class TaskResponseDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(task: TaskEntity) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt;
        this.updatedAt = task.updatedAt;
    }
}


export class MasterTaskResponseDto {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;

    user: UserResponseDto;

    constructor(task: TaskEntity, user: UserEntity) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt;
        this.updatedAt = task.updatedAt;

        this.user = new UserResponseDto(user);
    }
}