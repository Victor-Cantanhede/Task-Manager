import { LoginResponseDto } from '../dtos/LoginResponseDto';


export interface IAuthService {
    
    login(email: string, password: string): Promise<LoginResponseDto>;
}