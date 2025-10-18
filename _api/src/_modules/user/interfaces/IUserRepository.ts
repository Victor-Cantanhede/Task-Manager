import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserEntity } from 'src/_db/entities/db.entities';


export interface IUserRepository {

    create(dto: CreateUserDto): Promise<UserResponseDto>;

    findById(id: number): Promise<UserResponseDto | null>;

    findByEmail(email: string): Promise<UserEntity | null>;

    findAll(): Promise<Array<UserResponseDto | null>>;

    findByIdAndUpdate(id: number, data: UpdateUserDto): Promise<UserResponseDto>;
}

export const IUSER_REPOSITORY = 'IUserRepository';