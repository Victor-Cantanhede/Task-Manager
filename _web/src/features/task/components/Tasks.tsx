import { useEffect, useState } from 'react';
import { taskService } from '../services/task.service';
import { BrushCleaning, Check, Eye, Funnel, Play, Trash } from 'lucide-react';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/CheckBox';
import type { MasterTaskResponseDto, TaskResponseDto, TaskStatus } from '../dtos/task.service.dtos';
import { useModal } from '../../../context/modal/ModalContext';
import TaskDetail from './TaskDetail';


export default function Tasks() {

    const [tasks, setTasks] = useState<Array<TaskResponseDto | MasterTaskResponseDto | null>>();
    const [searchTask, setSearchTask] = useState('');
    const [filteredTasks, setFilteredTasks] = useState<Array<TaskResponseDto | MasterTaskResponseDto | null>>();

    const [statusFilter, setStatusFilter] = useState({
        pending: true,
        inProgress: true,
        completed: true
    });

    const [loading, setLoading] = useState(false);

    const { openModal, closeModal } = useModal();


    const getTasks = async () => {
        setLoading(true);
        const response = await taskService.getAll();

        if (response.success) {
            setTasks(response.data);
            setFilteredTasks(response.data);
            
        } else {
            window.alert(response.error.message);
        }
        
        setLoading(false);
    };


    const detailTask = (id: number) => {
        const task = tasks?.find(t => t && t.id === id);
        if (!task) return;

        openModal(<TaskDetail task={task} closeModal={closeModal} />);
    };


    const updateTaskStatus = async (id: number, status: TaskStatus) => {
        setLoading(true);

        const newStatus: TaskStatus = status === 'pendente' ? 'andamento' : 'concluída';

        const response = await taskService.updateById(id, { status: newStatus });

        if (response.success) {

            const updatedTasks = tasks?.map(t => t && t.id === id ? { ...t, status: newStatus } : t);
            if (updatedTasks) {
                setTasks(updatedTasks);
                setFilteredTasks(updatedTasks);
            }
            window.alert('Success!');

        } else {
            window.alert(response.error.message);
        }

        setLoading(false);
    };


    const deleteTask = async (id: number) => {
        setLoading(true);
        const response = await taskService.deleteById(id);

        if (response.success) {
            setTasks(tasks => tasks && tasks.filter(t => t && t.id !== id));
            setFilteredTasks(tasks => tasks && tasks.filter(t => t && t.id !== id));
            window.alert('Success!');

        } else {
            window.alert(response.error.message);
        }

        setLoading(false);
    };


    const handleSearchTask = () => {
        const filtered = tasks?.filter(t => t?.title.toLowerCase().includes(searchTask.toLowerCase()));
        setFilteredTasks(filtered);
    };


    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        handleSearchTask();
    }, [searchTask]);


    return (
        <div className='h-full grid grid-rows-[auto_1fr] gap-4 overflow-hidden'>
            <div className='flex flex-row flex-wrap items-end gap-4'>
                <Input
                    style={{ minWidth: '50%' }}
                    id='title'
                    type='search'
                    label='Filter title'
                    icon={<Funnel size={'1rem'} />}
                    placeholder='Enter a title'
                    autoComplete='off'
                    value={searchTask}
                    onChange={(e) => setSearchTask(e.target.value)} />

                <div className='flex flex-row flex-wrap gap-4'>
                    <Checkbox
                    id='completed'
                    label='concluída'
                    checked={statusFilter.completed}
                    onClick={() => setStatusFilter(prev => ({ ...prev, completed: prev.completed ? false : true }))} />

                    <Checkbox
                        id='in_progress'
                        label='andamento'
                        checked={statusFilter.inProgress}
                        onClick={() => setStatusFilter(prev => ({ ...prev, inProgress: prev.inProgress ? false : true }))} />

                    <Checkbox
                        id='pending'
                        label='pendente'
                        checked={statusFilter.pending}
                        onClick={() => setStatusFilter(prev => ({ ...prev, pending: prev.pending ? false : true }))} />
                </div>
            </div>

            <div className='border-t border-gray-200 grid grid-cols-3 gap-3 overflow-auto'>

                {statusFilter.pending &&
                    <div>
                        <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                            <p className='rounded-[5px] bg-red-50 font-medium text-center text-red-400'>Pending</p>
                        </div>

                        { filteredTasks &&
                            <div className='flex flex-col gap-2'>
                                { filteredTasks.map(task => task?.status === 'pendente' &&
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
                                                icon={<Eye size={'1rem'}
                                                onClick={() => detailTask(task.id)} />} />

                                            <Button
                                                style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                                icon={<Play size={'1rem'} />}
                                                onClick={() => updateTaskStatus(task.id, task.status)} />

                                            <Button
                                                style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                                icon={<Trash size={'1rem'} />}
                                                onClick={() => deleteTask(task.id)} />
                                        </menu>

                                    </div>
                                )}
                            </div>
                        }
                    </div>
                }

                {statusFilter.inProgress &&
                    <div>
                        <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                            <p className='rounded-[5px] bg-blue-50 font-medium text-center text-blue-400'>In progress</p>
                        </div>

                        { filteredTasks && statusFilter.inProgress &&
                            <div className='flex flex-col gap-2'>
                                { filteredTasks.map(task => task?.status === 'andamento' &&
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
                                                icon={<Eye size={'1rem'}
                                                onClick={() => detailTask(task.id)} />} />

                                            <Button
                                                style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                                icon={<Check size={'1rem'} />}
                                                onClick={() => updateTaskStatus(task.id, task.status)} />

                                            <Button
                                                style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                                icon={<Trash size={'1rem'} />}
                                                onClick={() => deleteTask(task.id)} />
                                        </menu>

                                    </div>
                                )}
                            </div>
                        }
                    </div>
                }

                {statusFilter.completed &&
                    <div>
                        <div className='pt-3 pb-3 rounded-b-[5px] bg-[#ffffffcc] backdrop-blur-[2px] sticky top-0'>
                            <p className='rounded-[5px] bg-green-50 font-medium text-center text-green-400'>Completed</p>
                        </div>

                        { filteredTasks && statusFilter.completed &&
                            <div className='flex flex-col gap-2'>
                                { filteredTasks.map(task => task?.status === 'concluída' &&
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
                                                icon={<Eye size={'1rem'}
                                                onClick={() => detailTask(task.id)} />} />

                                            <Button
                                                style={{ width: '29px', background: 'transparent', color: '#999999', scale: '0.9' }}
                                                icon={<Trash size={'1rem'} />}
                                                onClick={() => deleteTask(task.id)} />
                                        </menu>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    );
}