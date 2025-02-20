/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

interface PerformanceType {
    imageUrl: string;
    _id: string;
    timestamp: number
}

const page = () => {
    const [img, setImg] = React.useState<File | null>(null)
    const [ImgsShow, setImgsShow] = React.useState<PerformanceType[]>([])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", img as File);
        try {
            const response = await fetch("/api/performance", {
                method: "POST",
                body: formData
            });
            // const result = await response.json();
            if (response.ok) {
                toast.success("บันทึกสําเร็จ");
                getPerformance();
            }
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    }

    const getPerformance = async () => {
        try {
            const res = await fetch('/api/performance', {
                method: "GET",
            });
            if (!res.ok) {
                toast.error("ไม่สามารถดึงรูปได้");
                console.error("Failed to fetch performance");
            }
            const data = await res.json();
            setImgsShow(data);
        } catch (error) {
            console.error("Error fetching performance:", error);
        }
    }

    const deletePerformance = async (id: string) => {
        try {
            const res = await fetch(`/api/performance`, {
                body: JSON.stringify({ id: id }),
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("ลบรูปเรียบร้อย");
                getPerformance();
            }
        } catch (error) {
            console.error("Error deleting performance:", error);
        }
    }

    useEffect(() => {
        getPerformance();
    }, [])

    return (
        <div className='flex h-full '>

            <form onSubmit={onSubmit} className='space-y-4 p-4 w-[20rem]'>
                <div className='flex flex-col gap-1'>
                    <span>รูปผลงาน</span>
                    <input
                        onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
                        type="file" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <button className='text-white bg-primary rounded-md px-6 py-2 w-full'>บันทึก</button>
            </form>
            <div className='grow border rounded-xl space-y-2 p-4'>
                <span>รูปทั้งหมด</span>
                <div className='grid grid-cols-5 gap-4'>
                    {ImgsShow.map((img, index) => (
                        <div key={index} className='flex gap-2 items-center w-full relative aspect-square'>
                            <Image src={img.imageUrl} fill objectFit='cover' alt='img' />
                            <div onClick={() => deletePerformance(img._id)} className='absolute top-2 right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center'></div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default dynamic(() => Promise.resolve(page), { ssr: false })