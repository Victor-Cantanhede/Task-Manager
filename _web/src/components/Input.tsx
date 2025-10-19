import {
    useEffect,
    useRef,
    type ReactNode,
    type InputHTMLAttributes,
    type CSSProperties,
} from 'react';



interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    id: string;
    label?: string;
    icon?: ReactNode;
    style?: CSSProperties;
    resizeble?: boolean;
}

export function Input({ id, label, icon, style, resizeble, ...props }: InputProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!resizeble || !textareaRef.current || !containerRef.current) return;

        const observer = new ResizeObserver(() => {
            const textareaHeight = textareaRef.current!.offsetHeight;
            containerRef.current!.style.height = `${textareaHeight}px`;
        });

        observer.observe(textareaRef.current);

        return () => observer.disconnect();
    }, [resizeble]);


    return (
        <label htmlFor={id} style={style} className='w-max max-w-full flex flex-col gap-1'>

            { label && <p className='text-[0.9rem] font-black-01'>{label}</p> }
            
            <div
                ref={containerRef}
                className='min-h-8 p-1 pl-2 pr-2 flex flex-nowrap items-center gap-2 border border-transparent rounded-[5px] bg-[#eeeeee] duration-100 focus-within:border-blue-500 overflow-hidden'
            >
                { icon && <span className='flex justify-center items-center text-gray-400'>{icon}</span> }

                {!resizeble &&
                    <input
                        id={id}
                        className='w-full outline-none text-[0.8rem]'
                        {...props} />
                }

                {resizeble &&
                    <textarea
                        ref={textareaRef}
                        id={id}
                        style={style}
                        className='w-full pt-2 outline-none text-[0.8rem] flex items-center grow resize-y'
                        {...props} />
                }
            </div>
        </label>
    );
}