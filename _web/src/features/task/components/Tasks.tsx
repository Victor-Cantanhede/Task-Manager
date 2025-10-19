import { useEffect, useState } from 'react';
import { taskService } from '../services/task.service';
import { Check, Eye, Funnel, Play, TextSearch, Trash } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/CheckBox';
import type { MasterTaskResponseDto, TaskResponseDto } from '../dtos/task.service.dtos';


export default function Tasks() {

    const [tasks, setTasks] = useState<Array<TaskResponseDto | MasterTaskResponseDto | null>>();

    const [loading, setLoading] = useState(false);


    const getTasks = async () => {
        setLoading(true);
        const response = await taskService.getAll();

        if (response.success) {
            setTasks(response.data);

        } else {
            console.error(response.error);
        }

        setLoading(false);
    };


    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);


    return (
        <div className='h-full grid grid-rows-[auto_1fr] gap-4 overflow-hidden'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row flex-wrap items-end gap-4'>
                    <Input
                        style={{ minWidth: '50%' }}
                        id='title'
                        type='text'
                        label='Filter title'
                        icon={<Funnel size={'1rem'} />}
                        placeholder='Enter a title'
                        autoComplete='off' />

                    <div className='flex flex-row flex-wrap gap-4'>
                        <Checkbox
                        id='completed'
                        label='concluída'
                        autoComplete='off' />

                        <Checkbox
                            id='in_progress'
                            label='andamento' />

                        <Checkbox
                            id='pending'
                            label='pendente' />
                    </div>
                </div>

                <Button
                    style={{ width: '100px' }}
                    label='Search'
                    icon={<TextSearch size={'1rem'} />}
                    loading={loading} />
            </div>

            <div className='border-t border-gray-200 grid grid-cols-3 gap-3 overflow-auto'>

                <div>
                    <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                        <p className='rounded-[5px] bg-red-50 font-medium text-center text-red-400'>Pending</p>
                    </div>

                    { tasks &&
                        <div className='flex flex-col gap-2'>
                            { tasks.map(task => task?.status === 'pendente' &&
                                <div
                                    key={task.id}
                                    className='
                                        p-2 border-l-2 flex flex-nowrap justify-between items-center
                                        border-red-400 rounded-[5px] bg-gray-50 shadow
                                    '
                                >

                                    <p className='text-[0.8rem] truncate'>{task.title}</p>

                                    <menu className='flex flex-nowrap'>
                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Eye size={'1rem'} />} />

                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Play size={'1rem'} />} />

                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Trash size={'1rem'} />} />
                                    </menu>

                                </div>
                            )}
                        </div>
                    }
                </div>

                <div>
                    <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                        <p className='rounded-[5px] bg-blue-50 font-medium text-center text-blue-400'>In progress</p>
                    </div>

                    { tasks &&
                        <div className='flex flex-col gap-2'>
                            { tasks.map(task => task?.status === 'andamento' &&
                                <div
                                    key={task.id}
                                    className='
                                        p-2 border-l-2 flex flex-nowrap justify-between items-center
                                        border-blue-400 rounded-[5px] bg-gray-50 shadow
                                    '
                                >

                                    <p className='text-[0.8rem] truncate'>{task.title}</p>

                                    <menu className='flex flex-nowrap'>
                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Eye size={'1rem'} />} />

                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Check size={'1rem'} />} />

                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Trash size={'1rem'} />} />
                                    </menu>

                                </div>
                            )}
                        </div>
                    }
                </div>

                <div>
                    <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                        <p className='rounded-[5px] bg-green-50 font-medium text-center text-green-400'>Completed</p>
                    </div>

                    { tasks &&
                        <div className='flex flex-col gap-2'>
                            { tasks.map(task => task?.status === 'concluída' &&
                                <div
                                    key={task.id}
                                    className='
                                        p-2 border-l-2 flex flex-nowrap justify-between items-center
                                        border-green-400 rounded-[5px] bg-gray-50 shadow
                                    '
                                >

                                    <p className='text-[0.8rem] truncate'>{task.title}</p>

                                    <menu className='flex flex-nowrap'>
                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Eye size={'1rem'} />} />

                                        <Button
                                            style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                            icon={<Trash size={'1rem'} />} />
                                    </menu>
                                </div>
                            )}
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}