import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { IUserService } from './interfaces/IUserService';
import type { IUserRepository } from './interfaces/IUserRepository';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserResponseDto } from './dtos/UserResponseDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';


@Injectable()
export class UserService implements IUserService {

    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}


    async create(dto: CreateUserDto): Promise<UserResponseDto> {

        const existingEmail = await this.userRepository.findByEmail(dto.email);
        if (existingEmail) {
            throw new ConflictException('There is already a user registered with this email');
        }

        const newUser: CreateUserDto = {
            name: dto.name.toUpperCase(),
            email: dto.email.toLowerCase(),
            password: dto.password
        };

        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        const createdUser = await this.userRepository.create(newUser);
        return createdUser;
    }


    async getById(id: number, authenticatedUser: UserResponseDto): Promise<UserResponseDto> {

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.id !== authenticatedUser.id && authenticatedUser.role !== 'MASTER') {
            throw new ForbiddenException("You do not have permission to view this user's data");
        }

        return user;
    }


    async getAll(authenticatedUser: UserResponseDto): Promise<Array<UserResponseDto> | null> {

        if (authenticatedUser.role !== 'MASTER') {
            throw new ForbiddenException('You do not have permission to view users data');
        }

        const users = await this.userRepository.findAll();
        return users;
    }


    async updateById(id: number, authenticatedUser: UserResponseDto, dto: UpdateUserDto): Promise<UserResponseDto> {

        const user = await this.getById(id, authenticatedUser);
        const newUserData = dto;

        if (newUserData.password) {
            const hashedPassword = await bcrypt.hash(newUserData.password, 10);
            newUserData.password = hashedPassword;            
        }

        const updatedUser = await this.userRepository.findByIdAndUpdate(user.id, newUserData);
        return updatedUser;
    }
}
