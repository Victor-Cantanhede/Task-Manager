import { UserEntity, UserRole } from 'src/db/entities/db.entities';


export class UserResponseDto {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}