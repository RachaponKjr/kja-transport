import HeadText from '@/components/ui/head-text'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'motion/react';
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

function WorkReview() {
    const [reviews, setReviews] = React.useState([]);

    const getImageReview = async () => {
        const res = await fetch('/api/performance', { method: 'GET' });
        if (!res.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data = await res.json();
        setReviews(data);
        console.log(data);
    }

    useEffect(() => {
        void getImageReview();
    }, [])
    return (
        <div className='space-y-4'>
            <HeadText text='ผลงานส่วนหนึ่งของเรา' />
            {reviews.length > 0 ? (

                <Swiper
                    className='w-full'
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop
                    modules={[Autoplay]}
                >
                    {reviews.map((review: { imageUrl: string }, index: number) => {
                        return (
                            <>
                                <SwiperSlide key={index + 1}>
                                    <motion.div
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className='md:w-[500px] place-self-center aspect-square sm:aspect-[16/12] rounded-lg flex flex-col justify-between items-center'>
                                        <Image src={review.imageUrl} alt={'images'} width={500} height={500} />
                                    </motion.div>
                                </SwiperSlide>
                            </>
                        )
                    })}
                </Swiper>
            ) : (
                <div className='flex justify-center text-3xl font-semibold text-[#444444]'>
                    <span>ไม่มีรีวิว</span>
                </div>
            )}
        </div>
    )
}

export default WorkReview