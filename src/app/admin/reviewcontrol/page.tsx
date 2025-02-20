/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface DataType {
    name: string
    reviewText: string
    reviewLink: string
    file: File
}

interface ReviewType {
    imageUrl: string
    _id: string
    name: string
    reviewLink: string
    reviewText: string
    timestamp: number
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

    const [review, setReview] = useState<ReviewType[]>([])

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
            if (result.error) {
                toast.error("เกิดข้อผิดพลาดในการบันทึก");
            } else {
                setData({
                    file: new File([], ""),
                    name: "",
                    reviewText: "",
                    reviewLink: ""
                });
                getReview();
                toast.success("บันทึกสําเร็จ");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const delReview = async ({ id }: { id: string }) => {
        try {
            // ส่งคำขอลบไปที่ API
            const response = await fetch('/api/review', {
                method: "DELETE",
                body: JSON.stringify({ id: id }),
            });

            if (response.ok) {
                // ถ้าลบสำเร็จ, ลบข้อมูลรีวิวจาก state
                setReview((prevReviews) => prevReviews.filter((item) => item._id !== id));
                toast.success("ลบรีวิวเรียบร้อย");
            } else {
                toast.error("ไม่สามารถลบรีวิวได้");
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการลบรีวิว");
            console.error("Error deleting review:", error);
        }
    };


    const getReview = async () => {
        try {
            const res = await fetch('/api/review', {
                method: "GET",
            });

            if (res.ok) {
                const data = await res.json(); // เรียกใช้ json() เพื่อดึงข้อมูลจาก response
                setReview(data) // นำข้อมูลที่ได้มาใช้งาน
            } else {
                console.error("Failed to fetch reviews:", res.status);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        void getReview()
    }, [])

    console.log(review)
    return (
        <div className='w-full flex flex-row grow'>
            <form onSubmit={onSubmit} className='space-y-4 p-4 w-[20rem]'>
                <div className='flex flex-col gap-1'>
                    <span>ชื่อ ผู้ใช้</span>
                    <input
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        type="text" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>ลิงค์โปรไฟล์ผู้ใช้</span>
                    <input
                        value={data.reviewLink}
                        onChange={(e) => setData({ ...data, reviewLink: e.target.value })}
                        type="text" className='border border-[#444444] focus-visible:outline-none px-2 py-1 rounded-lg' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span>ข้อความรีวิว</span>
                    <input
                        value={data.reviewText}
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
            <div className='grow p-4 border rounded-xl h-[30rem] overflow-hidden overflow-y-auto'>
                <span>รายการทั้งหมด</span>
                {review.map((item, index) => {
                    return (
                        <>
                            <div key={index + 1} className='my-4 flex items-center justify-between border-b py-2'>
                                <div className='flex gap-2'>
                                    <Image src={item.imageUrl} alt='' width={100} height={100} />
                                    <div className='h-full flex flex-col gap-2'>
                                        <h3>ชื่อ : {item.name}</h3>
                                        <span className='line-clamp-2'>-ข้อความ : {item.reviewText}</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => delReview({ id: item._id })}
                                        className='bg-red-500 text-white px-2 py-1 rounded-lg'>ลบรีวิว</button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
            <ToastContainer />
        </div >
    )
}

export default page