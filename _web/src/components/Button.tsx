import { LoaderCircle } from 'lucide-react';
import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    loading?: boolean;
}

export function Button({ label, icon, style, loading, ...props }: ButtonProps) {


    return (
        <button
            style={style}
            className='
                h-8 p-1 rounded-[5px] flex flex-nowrap justify-center items-center gap-2
                background-blue-color-01 cursor-pointer active:scale-98 hover:shadow-xl duration-200'
            {...props}>

            { !loading &&
                <>
                    { icon && <span className='flex justify-center items-center'>{icon}</span> }

                    { label && <p className='text-[0.9rem]'>{label}</p> }
                </>
            }

            { loading && 
                <>
                    <span className='flex justify-center items-center animate-spin'><LoaderCircle size={'1.2rem'} /></span>
                </>
            }
        </button>
    );
}