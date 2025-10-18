import { UserResponseDto } from 'src/_modules/user/dtos/UserResponseDto';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { MasterTaskResponseDto, TaskResponseDto } from '../dtos/TaskResponseDto';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';


export interface ITaskService {

    create(dto: CreateTaskDto, authenticatedUser: UserResponseDto): Promise<TaskResponseDto>;

    getById(taskId: number, authenticatedUser: UserResponseDto): Promise<TaskResponseDto>;

    getAll(authenticatedUser: UserResponseDto): Promise<Array<TaskResponseDto | MasterTaskResponseDto | null>>;

    updateById(taskId: number, dto: UpdateTaskDto, authenticatedUser: UserResponseDto): Promise<TaskResponseDto>;

    deleteById(taskId: number, authenticatedUser: UserResponseDto): Promise<boolean>;
}