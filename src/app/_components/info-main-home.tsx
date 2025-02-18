'use client'
import Image from 'next/image';
import React from 'react';
import { cn } from '../../libs/cn'; // คุณควรตรวจสอบว่า `cn` ฟังก์ชันทำงานได้ถูกต้อง
import { motion } from 'motion/react';

function InfoMainHome() {

    return (
        <div className={cn("flex-col", "lg:h-[calc(100vh-10rem)] flex lg:flex-row items-center justify-evenly")}>
            <div className="space-y-8 lg:max-w-[60%] mt-24 lg:mt-0">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-primary my-2 text-center lg:text-start"
                >
                    บริการรถรับจ้างขนของ ราคาถูก ทั่วประเทศ
                </motion.h1>
                <motion.span
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-[#444444] text-[14px] lg:text-base'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, optio sit voluptas magni dolorem nostrum, quisquam nemo pariatur magnam, veniam officia. Rerum incidunt iusto repellendus necessitatibus porro perspiciatis itaque quam?
                </motion.span>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center gap-4">
                    <span>สอบถามเพิ่มเติมคลิก</span>
                    <button className="text-white bg-primary rounded-md px-6 py-2">โทร : 099-999999</button>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative my-12 lg:my-0">
                <Image src="/images/sample-image.jpg" alt="Service Image" width={300} height={300} className="w-[300px] aspect-square bg-neutral-200" />
                {/* หากต้องการภาพที่ซ้อนกันสามารถเปิดบรรทัดนี้ */}
                {/* <Image src="/images/sample-image.jpg" alt="Background Image" className="w-[300px] aspect-square bg-red-200 absolute -top-[100px] -z-10 -left-[150px]" /> */}
            </motion.div>
        </div>
    );
}

export default InfoMainHome;
