import { useEffect, useState } from 'react';
import { ChevronLeft, CircleUser, FilePlus2, LogOut, Search } from 'lucide-react';
import { Button } from '../components/Button';
import CreateTask from '../features/task/components/CreateTask';
import Tasks from '../features/task/components/Tasks';



enum NameOptionEnum {
    NEW_TASK = 'New task',
    MY_TASKS = 'My tasks',
}

interface MenuOption {
    name: NameOptionEnum;
    icon: React.ReactNode;
    active: boolean;
}

export default function TaskPage() {

    const [activeMenu, setActiveMenu] = useState<MenuOption>();

    const [menu, setMenu] = useState<Array<MenuOption>>([
        {
            name: NameOptionEnum.NEW_TASK,
            icon: <FilePlus2 size={'1.1rem'} />,
            active: false
        },
        {
            name: NameOptionEnum.MY_TASKS,
            icon: <Search size={'1.1rem'} />,
            active: false
        }
    ]);

    const selectMenuOption = (index: number) => {

        setMenu(menu => menu.map((option, i) => i === index
            ? { ...option, active: true }
            : { ...option, active: false }
        ));
    };
    
    useEffect(() => {
        setActiveMenu(menu.find(option => option.active));
    }, [menu]);


    return (
        <div className='max-w-6xl m-auto h-full p-4 overflow-auto grid grid-rows-[auto_1fr] gap-4'>

            <header className='p-3 flex justify-between items-center rounded-[5px] bg-white shadow-xl'>
                <div className='flex flex-row flex-nowrap gap-2'>
                    <span className='rounded-full background-blue-color-01'><CircleUser size={'1.5rem'} /></span>
                    <p className='font-medium font-black-01'>Hello {'{{Usuário}}'}</p>
                </div>
                <div>
                    <Button
                        label='Logout'
                        icon={<LogOut size={'1rem'} />} />
                </div>
            </header>

            <div className='p-3 rounded-[5px] grid grid-cols-[auto_1fr] bg-white shadow-xl overflow-hidden'>
                <menu className='pr-3 border-r border-gray-200 w-[200px] overflow-auto'>
                    <p className='font-medium font-black-01'>Menu</p>
                    
                    <ul className='mt-3 flex flex-col gap-2'>
                        {menu.map((option, index) =>
                            <li
                                key={index}
                                onClick={() => selectMenuOption(index)}
                                className='
                                    p-1 flex flex-row flex-nowrap items-center gap-2 border-2 border-transparent rounded-[5px]
                                    bg-gray-50 font-black-01 cursor-pointer duration-200
                                    hover:border-l-gray-200 hover:border-b-gray-200 hover:bg-gray-100 hover:pl-2 active:scale-98
                                '
                            >
                                <span className='flex justify-center items-center font-black-01'>{option.icon}</span>
                                <p>{option.name}</p>

                                {option.active &&
                                    <span className='ml-auto flex justify-center items-center font-black-01'>
                                        <ChevronLeft size={'1rem'} />
                                    </span>
                                }
                            </li>
                        )}
                    </ul>
                </menu>

                <div className='pr-0 pl-3 grid grid-rows-[auto_1fr] gap-3 overflow-hidden'>
                    <header>
                        {activeMenu &&
                            <p className='font-medium font-black-01'>{activeMenu.name}</p>
                        }
                    </header>
                    
                    <div className='h-full overflow-auto'>
                        
                        {activeMenu?.name === NameOptionEnum.NEW_TASK &&
                            <CreateTask />
                        }

                        {activeMenu?.name === NameOptionEnum.MY_TASKS &&
                            <Tasks />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}