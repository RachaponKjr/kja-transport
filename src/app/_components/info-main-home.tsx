import Image from 'next/image'
import React from 'react'
import { cn } from '../../libs/cn';

function InfoMainHome() {
    return (
        <div className={cn("flex-col", "lg:h-[calc(100vh-10rem)] flex lg:flex-row items-center justify-evenly")}>
            <div className="space-y-8 lg:max-w-[60%] mt-24 lg:mt-0">
                <h1 className="text-3xl font-semibold text-primary my-2 text-center lg:text-start">บริการรถรับจ้างขนของ ราคาถูก ทั่วประเทศ</h1>
                <span className='text-[#444444] text-[14px] lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, optio sit voluptas magni dolorem nostrum, quisquam nemo pariatur magnam, veniam officia. Rerum incidunt iusto repellendus necessitatibus porro perspiciatis itaque quam?</span>
                <div className="flex flex-col items-center gap-4">
                    <span>สอบถามเพิ่มเติมคลิก</span>
                    <button className="text-white bg-primary rounded-md px-6 py-2">โทร : 099-999999</button>
                </div>
            </div>
            <div className="relative my-12 lg:my-0">
                <Image src={''} alt="" className="w-[300px] aspect-square bg-neutral-200" />
                {/* <Image src={''} alt="" className="w-[300px] aspect-square bg-red-200 absolute -top-[100px] -z-10 -left-[150px]" /> */}
            </div>
        </div>
    )
}

export default InfoMainHome