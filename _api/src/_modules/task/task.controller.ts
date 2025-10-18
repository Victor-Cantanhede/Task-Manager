import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateTaskDto } from './dtos/CreateTaskDto';
import { MasterTaskResponseDto, TaskResponseDto } from './dtos/TaskResponseDto';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator';
import { UserResponseDto } from '../user/dtos/UserResponseDto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';


@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {

    constructor(private readonly taskService: TaskService) {}


    @Post()
    @ApiBody({ type: CreateTaskDto })
    async create(
        @AuthenticatedUser() authenticatedUser: UserResponseDto,
        @Body() dto: CreateTaskDto
    
    ): Promise<TaskResponseDto> {
        return this.taskService.create(dto, authenticatedUser);
    }


    @Get()
    async getAll(@AuthenticatedUser() authenticatedUser: UserResponseDto): Promise<Array<TaskResponseDto | MasterTaskResponseDto | null>> {
        return this.taskService.getAll(authenticatedUser);
    }


    @Get(':taskId')
    @ApiParam({ name: 'taskId', type: String })
    async getById(
        @Param('taskId') taskId: string,
        @AuthenticatedUser() authenticatedUser: UserResponseDto

    ): Promise<TaskResponseDto> {
        return this.taskService.getById(parseInt(taskId), authenticatedUser);
    }


    @Put(':taskId')
    @ApiParam({ name: 'taskId', type: String })
    @ApiBody({ type: UpdateTaskDto })
    async updateById(
        @Param('taskId') taskId: string,
        @AuthenticatedUser() authenticatedUser: UserResponseDto,
        @Body() dto: UpdateTaskDto

    ): Promise<TaskResponseDto> {
        return this.taskService.updateById(parseInt(taskId), dto, authenticatedUser);
    }


    @Delete(':taskId')
    @ApiParam({ name: 'taskId', type: String })
    async deleteById(
        @Param('taskId') taskId: string,
        @AuthenticatedUser() authenticatedUser: UserResponseDto

    ): Promise<boolean> {
        return this.taskService.deleteById(parseInt(taskId), authenticatedUser);
    }
}
