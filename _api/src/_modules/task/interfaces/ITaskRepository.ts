import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { MasterTaskResponseDto, TaskResponseDto } from '../dtos/TaskResponseDto';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';


export interface ITaskRepository {

    create(userId: number, dto: CreateTaskDto): Promise<TaskResponseDto>;

    findById(userId: number, taskId: number): Promise<TaskResponseDto | null>;

    findAll(userId: number | undefined): Promise<Array<TaskResponseDto | MasterTaskResponseDto | null>>;

    findByIdAndUpdate(userId: number, taskId: number, dto: UpdateTaskDto): Promise<TaskResponseDto>;

    deleteById(userId: number, taskId: number): Promise<boolean>;
}

export const ITASK_REPOSITORY = 'ITaskRepository';