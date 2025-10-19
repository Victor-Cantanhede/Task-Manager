

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'USER' | 'MASTER';