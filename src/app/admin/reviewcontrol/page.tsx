/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'

interface DataType {
    name: string
    reviewText: string
    reviewLink: string
    file: File
}

const page = () => {
    const [data, setData] = useState<DataType>(
        {
            file: new File([], ""),
            name: "",
            reviewLink: "",
            reviewText: ""
        }
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData((prevData) => ({
                ...prevData,
                file: e.target.files ? e.target.files[0] : new File([], "")
            }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create FormData object to send
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("reviewText", data.reviewText);
        formData.append("reviewLink", data.reviewLink);
        formData.append("file", data.file);

        try {
            const response = await fetch("/api/review", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            console.log(result); // Handle the result as needed
        } catch (err) {
            console.error("Error submitting form:", err);
        }

        // Reset the form data after submitting
        setData({
            file: new File([], ""),
            name: "",
            reviewText: "",
            reviewLink: ""
        });
    };

    return (
        <div className='w-full flex flex-row grow'>
            <form onSubmit={onSubmit} className='space-y-4 p-4 w-[20rem]'>
                <div className='flex flex-col gap-1'>
                    <span>ชื่อ ผู้ใช้</span>
                    <input
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        type="text" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>ลิงค์โปรไฟล์ผู้ใช้</span>
                    <input
                        onChange={(e) => setData({ ...data, reviewLink: e.target.value })}
                        type="text" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>ข้อความรีวิว</span>
                    <input
                        onChange={(e) => setData({ ...data, reviewText: e.target.value })}
                        type="text" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>รูปภาพคนรีวิว</span>
                    <input
                        onChange={handleFileChange}
                        type="file" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <button className='text-white bg-primary rounded-md px-6 py-2 w-full'>บันทึก</button>
            </form>
            <div className='grow p-4 border rounded-xl'>
                <span>รายการทั้งหมด</span>
            </div>
        </div >
    )
}

export default page