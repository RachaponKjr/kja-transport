import HeadText from '@/components/ui/head-text'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'motion/react';
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import Link from 'next/link';

function ReviewUse() {

  const [reviews, setReviews] = React.useState([]);
  const getReview = async () => {
    const res = await fetch('/api/review', { method: 'GET' });
    if (!res.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await res.json();
    setReviews(data);
    console.log(data);
  }

  useEffect(() => {
    void getReview();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <HeadText text='รีวิวส่วนหนึ่งจากผู้ใช้งานจริง' />
      <div className="text-center w-full md:max-w-[500px] my-2 space-y-8 text-[#666666]">
        <motion.span
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-[14px] lg:text-base'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto necessitatibus hic provident illo
        </motion.span>
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
            {reviews.map((review: { imageUrl: string; reviewText: string; name: string; reviewLink?: string }, index: number) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className='w-full aspect-square sm:aspect-[16/12] p-6 border border-primary rounded-lg flex flex-col justify-between items-center'>
                  <Image src={review.imageUrl} className='w-[5rem] aspect-square rounded-md bg-neutral-200/50' alt='' width={500} height={500} />
                  <p className='text-[14px] font-medium w-full break-all'>{review.reviewText}</p>
                  <div className='space-y-2'>
                    <h5 className='font-semibold text-primary text-xl'>{review.name}</h5>
                    <div className='space-x-2'>
                      <span className='text-[14px]'>รีวิวผู้ใช้งานจริงจาก</span>
                      <Link href={review.reviewLink || '/'} target='_blank' className='font-semibold text-primary'>Facebook</Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className='flex justify-center text-3xl font-semibold'>
            <span>ไม่มีรีวิว</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewUse