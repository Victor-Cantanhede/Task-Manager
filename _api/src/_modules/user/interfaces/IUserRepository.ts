import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';


export interface IUserRepository {

    create(dto: CreateUserDto): Promise<UserResponseDto>;

    findById(id: number): Promise<UserResponseDto | null>;

    findByEmail(email: string): Promise<UserResponseDto | null>;

    findAll(): Promise<Array<UserResponseDto> | null>;

    findByIdAndUpdate(id: number, data: UpdateUserDto): Promise<UserResponseDto>;
}