import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Check, KeyRound, Mail, User } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import type { CreateUserDto } from '../dtos/user.service.dtos';
import { userService } from '../services/user.service';



export default function RegisterForm() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDto>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (dto: CreateUserDto) => {
        setLoading(true);
        const createUserResponse = await userService.create(dto);

        if (createUserResponse.success) {
            window.alert('Success!');
        } else {
            window.alert(createUserResponse.error.message);
        }

        setLoading(false);
    };


    return (
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                style={{ width: '100%' }}
                id='name'
                type='text'
                label='Name'
                icon={<User size={'1rem'} />}
                placeholder='Full Name'
                autoComplete='off'
                {...register('name', { required: 'Name is required' })} />

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
                label='Confirm'
                icon={<Check size={'1rem'} />}
                loading={loading} />
        </form>
    );
}