import { $Enums, User } from '@prisma/client';


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