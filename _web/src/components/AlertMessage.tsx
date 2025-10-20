import { Check, TriangleAlert, X } from 'lucide-react';
import { Button } from './Button';



interface IAlertMessage {
    type: 'success' | 'warning' | 'error';
    message: string;
    action: () => void;
}

export default function AlertMessage({ type, message, action }: IAlertMessage) {


    return (
        <div className='min-h-[200px] p-6 flex flex-col justify-center items-center'>

            { type === 'success' &&
                <>
                    <span className='p-2 border border-green-600 rounded-full text-green-600'>
                        <Check size={'1.5rem'} />
                    </span>
                    <p className='mt-3 font-medium text-green-600'>Success</p>
                </>
            }

            { type === 'warning' &&
                <>
                    <span className='p-1 rounded-full text-yellow-600'>
                        <TriangleAlert size={'1.5rem'} />
                    </span>
                    <p className='mt-3 font-medium text-yellow-600'>Alert</p>
                </>
            }

            { type === 'error' &&
                <>
                    <span className='p-2 border border-red-600 rounded-full text-red-600'>
                        <X size={'1.5rem'} />
                    </span>
                    <p className='mt-3 font-medium text-red-600'>Error</p>
                </>
            }
            
            <p className='mt-6 mb-6 text-[0.9rem] font-black-01'>{message}</p>
            <Button
                style={{ width: '40px' }}
                label='OK'
                onClick={action} />
        </div>
    );
}