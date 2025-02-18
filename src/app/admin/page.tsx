/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Cookies from 'js-cookie'

const page = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const router = useRouter()

    const onLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        Cookies.set('admin-token', data.token, { expires: 7 });
        router.push('/admin/reviewcontrol');
    };
    return (
        <div className='grid place-content-center h-[20rem]'>
            <div className='w-[300px] h-max space-y-4'>
                <h4 className='text-center text-2xl font-semibold'>Admin Login</h4>
                <div>
                    <span>Username</span>
                    <Input onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div>
                    <span>Password</span>
                    <Input type='password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <button onClick={onLogin} className='text-white bg-primary rounded-md px-6 py-2 w-full'>Login</button>
            </div>
        </div>
    )
}

export default page