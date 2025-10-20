import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { taskService } from '../services/task.service';
import { FileText, FolderPen, Save } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import type { CreateTaskDto } from '../dtos/task.service.dtos';



export default function CreateTask() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTaskDto>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (dto: CreateTaskDto) => {
        setLoading(true);

        const createdTask = await taskService.create(dto);

        if (createdTask.success) {
            window.alert('Success!');
            reset();

        } else {
            window.alert(createdTask.error.message);
        }

        setLoading(false);
    };


    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                style={{ minWidth: '50%' }}
                id='title'
                type='text'
                label='Title'
                icon={<FolderPen size={'1rem'} />}
                placeholder='Enter a title'
                autoComplete='off'
                {...register('title', { required: 'Title is required' })} />

            <Input
                style={{ width: '100%', minHeight: '100px' }}
                id='description'
                type='text'
                label='Description'
                icon={<FileText size={'1rem'} />}
                placeholder='Enter a description'
                autoComplete='off'
                resizeble
                {...register('description', { required: 'Description is required' })} />

            <Button
                style={{ width: '100px' }}
                label='Register'
                icon={<Save size={'1rem'} />}
                loading={loading} />
        </form>
    );
}