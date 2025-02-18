/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { cn } from '../../lib/utils';
import Cookies from 'js-cookie'

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()
    const path = usePathname()
    const adminToken = Cookies.get('admin-token')
    useEffect(() => {
        if (!adminToken) {
            router.push('/admin')
        }
    }, [])
    return (
        <div className='flex p-4 border-x'>
            <div className='min-h-[30rem] w-max  border-r-2 pr-4 flex flex-col justify-between gap-4 text-center'>
                <div className='flex flex-col gap-2'>
                    <div
                        onClick={() => router.push('/admin/reviewcontrol')}
                        className={cn(path === '/admin/reviewcontrol' ? "bg-primary text-white " : "text-[#444444]", 'px-6 py-2  rounded-lg flex items-center gap-2 cursor-pointer')}>
                        <span className='w-full'>จัดการรีวิว</span>
                    </div>
                    <div
                        onClick={() => router.push('/admin/photocontrol')}
                        className={cn(path === '/admin/photocontrol' ? "bg-primary text-white " : "text-[#444444]", 'px-6 py-2 rounded-lg  flex items-center gap-2 cursor-pointer')}>
                        <span className='w-full'>จัดการภาพรีวิว</span>
                    </div>
                </div>
                {adminToken && (
                    <button
                        className='bg-red-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer'
                        onClick={() => {
                            Cookies.remove('admin-token')
                            router.push('/admin')
                        }}>ออกจากระบบ</button>
                )}
            </div>
            <div className='pl-4 grow'>
                {children}
            </div>
        </div>
    )
}

export default layout