import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { taskService } from '../services/task.service';
import { FileText, FolderPen, Pencil, Save, Undo2, X } from 'lucide-react';
import { Button } from '../../../components/Button';
import type { MasterTaskResponseDto, TaskResponseDto, UpdateTaskDto } from '../dtos/task.service.dtos';
import { Input } from '../../../components/Input';



interface ITaskDetail {
    task: TaskResponseDto | MasterTaskResponseDto;
    closeModal: () => void;
}

export default function TaskDetail({ task, closeModal }: ITaskDetail) {

    const [updateTask, setUpdateTask] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateTaskDto>({
        defaultValues: {
            title: task.title,
            description: task.description,
        }
    });

    const [loading, setLoading] = useState(false);


    const onSubmit = async (dto: UpdateTaskDto) => {
        setLoading(true);
        
        const updatedTask = await taskService.updateById(task.id, dto);
        
        if (updatedTask.success) {
            window.alert('Success!');
            window.location.reload();
            
        } else {
            window.alert(updatedTask.error.message);
        }

        setLoading(false);
        setUpdateTask(false);
    };


    return (
        <div className='p-3 flex flex-col justify-center items-end gap-3 font-black-01'>

            { !updateTask &&
                <>
                    <div className='grow w-full p-3 border-l-2 border-gray-300 rounded-[5px] bg-gray-100 text-[0.9rem]'>
                        <div className='mb-3 pb-3 border-b border-gray-300'>
                            <p className='font-medium'>{task.title}</p>
                            <p className='text-[0.8rem]'>Created at: {task.createdAt.toString()}</p>
                            <p className='text-[0.8rem]'>Status: {task.status}</p>
                        </div>
                        <p className='font-medium'>Description:</p>
                        <p>{task.description}</p>
                    </div>

                    <menu className='flex flex-row flex-nowrap gap-1'>
                        { task.status !== 'concluída' &&
                            <Button
                                style={{ width: '30px' }}
                                icon={<Pencil size={'1rem'}
                                onClick={() => setUpdateTask(true)} />} />
                        }

                        <Button
                            style={{ width: '30px', background: '#ff5b5b' }}
                            icon={<Undo2 size={'1rem'} />}
                            onClick={closeModal} />
                    </menu>
                </>
            }

            { updateTask &&
                <form className='grow w-full rounded-[5px] flex flex-col items-end gap-4 text-[0.9rem]' onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        style={{ minWidth: '100%' }}
                        id='title'
                        label='Title'
                        type='text'
                        icon={<FolderPen size={'1rem'} />}
                        autoComplete='off'
                        {...register('title')} />

                    <Input
                        style={{ width: '100%', minHeight: '100px' }}
                        id='description'
                        label='Description'
                        type='text'
                        icon={<FileText size={'1rem'} />}
                        autoComplete='off'
                        resizeble
                        {...register('description')} />

                    <menu className='flex flex-row flex-nowrap gap-1'>
                        <Button
                            style={{ width: '30px' }}
                            icon={<Save size={'1rem'} />}
                            loading={loading} />

                        <Button
                            style={{ width: '30px', background: '#ff5b5b' }}
                            icon={<X size={'1rem'} />}
                            onClick={() => setUpdateTask(false)} />
                    </menu>
                </form>
            }

        </div>
    );
}