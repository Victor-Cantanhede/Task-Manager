import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import type { TaskStatus } from 'src/_db/entities/db.entities';


export class UpdateTaskDto {

    // Title validation: not empty, min length 3, max length 40
    @ApiPropertyOptional({
        example: 'Task title',
        description: 'The title of task',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(40, { message: 'Title must be at most 40 characters long' })
    title?: string;

    // Description validation: not empty, min length 3, max length 300
    @ApiPropertyOptional({
        example: 'Task description',
        description: 'The description of task',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    @MinLength(3, { message: 'Description must be at least 3 characters long' })
    @MaxLength(300, { message: 'Description must be at most 300 characters long' })
    description?: string;

    // Status validation: not empty, boolean
    @ApiPropertyOptional({
        example: 'andamento',
        description: 'The status of task (andamento/concluída/pendente)',
        required: false
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Status should not be empty' })
    status?: TaskStatus;

    constructor(title: string, description: string, status: TaskStatus) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}