import axios, { AxiosError, type AxiosResponse } from 'axios';


interface ApiErrorResponse {
    message: string;
}

type ApiResponse<T> =
    | { success: true, data: T }
    | { success: false, error: { message: string } }

export const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export async function request<T>(req: () => Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> {
    try {
        const response = await req();
        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        const err = error as AxiosError<ApiErrorResponse>;
        return {
            success: false,
            error: { 
                message: err.response?.data.message || 'Unknow error'
            }
        };
    }
};