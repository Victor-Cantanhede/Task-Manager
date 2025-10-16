import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';


export interface IUserService {

    create(dto: CreateUserDto): Promise<UserResponseDto>;

    getById(id: number, authenticatedUser: UserResponseDto): Promise<UserResponseDto>;

    getAll(authenticatedUser: UserResponseDto): Promise<Array<UserResponseDto> | null>;
    
    updateById(id: number, authenticatedUser: UserResponseDto, dto: UpdateUserDto): Promise<UserResponseDto>;
}