import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { AuthUserDto } from './dtos/AuthUserDto';
import { LoginResponseDto } from './dtos/LoginResponseDto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}


    @Post('login')
    @ApiBody({ type: AuthUserDto })
    async login(
        @Body() dto: AuthUserDto,
        @Res({ passthrough: true }) res: Response

    ): Promise<LoginResponseDto> {
        
        const loginResponse = await this.authService.login(dto.email, dto.password);

        res.cookie('access_token', loginResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return loginResponse;
    }
}
