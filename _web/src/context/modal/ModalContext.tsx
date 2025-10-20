import { createContext, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';


interface IModalContext {
    openModal: (component: ReactNode) => void;
    closeModal: () => void;
}

interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used inside ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    
    const [component, setComponent] = useState<ReactNode | null>(null);

    const openModal = (modalComponent: ReactNode) => setComponent(modalComponent);
    const closeModal = () => setComponent(null);


    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {component &&
                <Modal onClose={closeModal}>
                    {component}
                </Modal>
            }
        </ModalContext.Provider>
    );
};

const Modal = ({ children, onClose }: IModalProps) => {
    
    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-50'>
            <div
                className='
                    min-h-[200px] w-[400px] max-w-[95%] rounded-[5px] relative bg-white shadow-lg
                    motion-safe:animate-[modalIn_0.1s_ease-out_forwards]
                '
            >

                <button
                    className='
                        absolute top-1 right-2 text-gray-500 cursor-pointer hover:text-red-500 duration-200
                    '
                    onClick={onClose}

                >✕</button>

                {children}
            </div>
        </div>,
        document.body
    );
};