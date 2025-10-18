import { UserEntity } from 'src/_db/entities/db.entities';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';


export interface IUserService {

    create(dto: CreateUserDto): Promise<UserResponseDto>;

    getById(id: number, authenticatedUser: UserResponseDto): Promise<UserResponseDto>;

    getByEmail(email: string): Promise<UserEntity>;

    getAll(authenticatedUser: UserResponseDto): Promise<Array<UserResponseDto | null>>;
    
    updateById(id: number, authenticatedUser: UserResponseDto, dto: UpdateUserDto): Promise<UserResponseDto>;
}

export const IUSER_SERVICE = 'IUserService';