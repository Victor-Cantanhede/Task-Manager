import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateTaskDto {

    // Title validation: not empty, min length 3, max length 40
    @ApiProperty({
        example: 'Task title',
        description: 'The title of task',
        required: true
    })    
    @IsNotEmpty({ message: 'Title should not be empty' })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(40, { message: 'Title must be at most 40 characters long' })
    title: string;

    // Description validation: not empty, min length 3, max length 300
    @ApiProperty({
        example: 'Task description',
        description: 'The description of task',
        required: true
    })    
    @IsNotEmpty({ message: 'Description should not be empty' })
    @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
    @MinLength(3, { message: 'Description must be at least 3 characters long' })
    @MaxLength(300, { message: 'Description must be at most 300 characters long' })
    description: string;
}