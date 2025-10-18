import { $Enums, User, Task } from '@prisma/client';


export class UserEntity implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export type UserRole = $Enums.UserRole;


export class TaskEntity implements Task {
    id: number;
    title: string;
    description: string;
    status: $Enums.TaskStatus;
    createdAt: Date;
    updatedAt: Date;

    userId: number;
}
export type TaskStatus = $Enums.TaskStatus;