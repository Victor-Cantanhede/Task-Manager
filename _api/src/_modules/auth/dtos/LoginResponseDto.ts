import { UserResponseDto } from 'src/_modules/user/dtos/UserResponseDto';


export class LoginResponseDto {
    user: UserResponseDto;
    token: string;

    constructor(payloadUserToken: UserResponseDto, token: string) {
        this.user = { ...payloadUserToken },
        this.token = token
    }
}