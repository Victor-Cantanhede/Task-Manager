import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { KeyRound, LogIn, Mail } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import type { AuthUserDto } from '../dtos/auth.service.dtos';
import { useModal } from '../../../context/modal/ModalContext';
import AlertMessage from '../../../components/AlertMessage';
import { useAuthenticatedUser } from '../../../hooks/useAuthUser';



export default function AuthForm() {

    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { saveUser } = useAuthenticatedUser();

    const { register, handleSubmit, formState: { errors } } = useForm<AuthUserDto>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (dto: AuthUserDto) => {
        setLoading(true);
        const login = await authService.login(dto);

        if (login.success) {
            saveUser(login.data.user);
            navigate('/task');

        } else {
            openModal(
                <AlertMessage type='error' message={login.error.message} action={closeModal} />
            );
        }

        setLoading(false);
    };


    return (
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                style={{ width: '100%' }}
                id='email'
                type='email'
                label='Email'
                icon={<Mail size={'1rem'} />}
                placeholder='your.email@example.com'
                autoComplete='off'
                {...register('email', { required: 'Email is required' })} />

            <Input
                style={{ width: '100%' }}
                id='password'
                type='password'
                label='Password'
                icon={<KeyRound size={'1rem'} />}
                placeholder='Your password'
                autoComplete='off'
                {...register('password', { required: 'Password is required' })} />

            <Button
                style={{ marginTop: '20px' }}
                label='Login'
                icon={<LogIn size={'1rem'} />}
                loading={loading} />
        </form>
    );
}