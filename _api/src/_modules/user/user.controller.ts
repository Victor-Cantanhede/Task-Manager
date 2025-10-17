import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserResponseDto } from './dtos/UserResponseDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';


@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService) {}


    @Post()
    @ApiBody({ type: CreateUserDto })
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(dto);
    }


    @Get('get_all')
    @UseGuards(AuthGuard)
    async getAll(@AuthenticatedUser() authenticatedUser: UserResponseDto): Promise<Array<UserResponseDto> | null> {
        return this.userService.getAll(authenticatedUser);
    }


    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @UseGuards(AuthGuard)
    async getById(
        @Param('id') id: string,
        @AuthenticatedUser() authenticatedUser: UserResponseDto

    ): Promise<UserResponseDto> {
        return this.userService.getById(parseInt(id), authenticatedUser);
    }


    @Put(':id')
    @UseGuards(AuthGuard)
    async updateById(
        @Param('id') id: string,
        @AuthenticatedUser() authenticatedUser: UserResponseDto,
        @Body() dto: UpdateUserDto

    ): Promise<UserResponseDto> {
        return this.userService.updateById(parseInt(id), authenticatedUser, dto);
    }
}
