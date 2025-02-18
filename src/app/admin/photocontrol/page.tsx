/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'

const page = () => {
    const [img, setImg] = React.useState<File | null>(null)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", img as File);
        try {
            const response = await fetch("/api/performance", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    }
    return (
        <form onSubmit={onSubmit} className='space-y-4 p-4 w-[20rem]'>
            <div className='flex flex-col gap-1'>
                <span>รูปผลงาน</span>
                <input
                    onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
                    type="file" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
            </div>
            <button className='text-white bg-primary rounded-md px-6 py-2 w-full'>บันทึก</button>
        </form>
    )
}

export default page