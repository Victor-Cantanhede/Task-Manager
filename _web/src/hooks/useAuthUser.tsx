import { useState, useEffect, useCallback } from 'react';
import type { UserResponseDto } from '../features/user/dtos/user.service.dtos';



const STORAGE_KEY = 'authenticated_user';

export function useAuthenticatedUser() {
    
    const [user, setUser] = useState<UserResponseDto | null>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    });


    const saveUser = useCallback((userData: UserResponseDto) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
    }, []);


    const clearUser = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    }, []);


    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) {
                setUser(event.newValue ? JSON.parse(event.newValue) : null);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return { user, saveUser, clearUser, isAuthenticated: !!user };
}