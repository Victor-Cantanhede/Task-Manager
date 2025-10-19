import { useState } from 'react';
import AuthForm from '../features/user/components/AuthForm';
import RegisterForm from '../features/user/components/RegisterForm';


export default function LoginPage() {

    const [hasAccount, setHasAccount] = useState(true);


    return (
        <div className='h-full overflow-auto'>
            <div className='w-[400px] max-w-[95%] mt-[100px] m-auto p-4 pt-7 pb-7 flex flex-col items-center gap-3.5 rounded-[5px] bg-white shadow-xl'>

                <h1 className='mb-3.5 text-2xl font-medium font-black-01'>Task Manager</h1>
                
                { hasAccount &&
                    <>
                        <p className='mb-3.5 text-center font-black-01'>
                            Welcome to the Task Manager!<br />
                            To get started, enter your login details below.
                        </p>

                        <AuthForm />

                        <a className='text-[0.9rem] text-[#202020] cursor-pointer hover:text-blue-400' onClick={() => setHasAccount(false)}>Don't have an account yet? Sign-up here</a>
                    </>
                }

                { !hasAccount &&
                    <>
                        <p className='text-center font-black-01'>Sign-up</p>
                        <RegisterForm />

                        <a className='text-[0.9rem] text-[#202020] cursor-pointer hover:text-blue-400' onClick={() => setHasAccount(true)}>Already have an account? Login here</a>
                    </>
                }
            </div>
        </div>
    );
}