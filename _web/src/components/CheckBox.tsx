import {
    useState,
    type InputHTMLAttributes,
    type CSSProperties
} from 'react';
import { Square, SquareCheckBig } from 'lucide-react';



interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    id: string;
    label?: string;
    style?: CSSProperties;
}

export function Checkbox({ id, label, style, ...props }: InputProps) {

    const [checked, setChecked] = useState(true);


    return (
        <label
            htmlFor={id}
            style={style}
            className='w-max max-w-full flex flex-col gap-1'
        >            
            <div
                className='min-h-8 p-1 pl-2 pr-2 flex flex-nowrap items-center gap-2 border border-[#eeeeee] rounded-[5px] cursor-pointer overflow-hidden'
            >
                { !checked &&
                    <span 
                        className='
                            flex justify-center items-center rounded-[3px]
                            text-gray-400 duration-200 hover:bg-gray-50 active:scale-90
                        '
                    >
                        <Square size={'1rem'} />
                    </span>
                }

                { checked &&
                    <span
                        className='
                            flex justify-center items-center rounded-[3px]
                            text-blue-400 duration-200 hover:bg-gray-50 active:scale-90
                        '
                    >
                        <SquareCheckBig size={'1rem'} />
                    </span>
                }

                <p className='text-[0.9rem] font-black-01'>{label}</p>

                <input
                    id={id}
                    type='checkbox'
                    className='hidden'
                    onChange={(e) => setChecked(e.target.checked)}
                    {...props} />
            </div>
        </label>
    );
}