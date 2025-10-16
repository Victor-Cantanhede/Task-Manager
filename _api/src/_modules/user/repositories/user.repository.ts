import { Injectable, NotFoundException } from '@nestjs/common';
import { DbClient } from 'src/db/db.service';
import { IUserRepository } from '../interfaces/IUserRepository';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';


@Injectable()
export class UserRepository implements IUserRepository {
    
    constructor(private readonly DbClient: DbClient) {}

    async create(dto: CreateUserDto): Promise<UserResponseDto> {
        const createdUser = await this.DbClient.user.create({ data: dto }).then(u => new UserResponseDto(u));
        return createdUser;
    }

    async findById(id: number): Promise<UserResponseDto | null> {
        const user = await this.DbClient.user.findUnique({ where: { id } }).then(u => u ? new UserResponseDto(u): null);
        return user;
    }

    async findByEmail(email: string): Promise<UserResponseDto | null> {
        const user = await this.DbClient.user.findUnique({ where: { email } }).then(u => u ? new UserResponseDto(u) : null);
        return user;
    }

    async findAll(): Promise<Array<UserResponseDto> | null> {
        const users = await this.DbClient.user.findMany().then(users => 
            users.map(u => new UserResponseDto(u))
        );
        if (users.length === 0) return null;

        return users;
    }

    async findByIdAndUpdate(id: number, data: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const updatedUser = await this.DbClient.user.update({
            where: { id },
            data: data
        })
        .then(u => new UserResponseDto(u));

        return updatedUser;
    }
}