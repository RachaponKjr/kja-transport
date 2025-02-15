import { cn } from '@/libs/cn'
import Image from 'next/image'
import React from 'react'

import line from "@/assets/icons/line.svg"
import facebook from "@/assets/icons/facebook.svg"

interface LinkProps {
    name: string;
    href: string;
}
const Footer = () => {
    const link: LinkProps[] = [
        {
            name: "หน้าแรก",
            href: "/",
        },
        {
            name: "ขนส่งมอเตอร์ไซต์",
            href: "/motorcycle",
        },
        {
            name: "ขนของย้ายบ้าน คอนโด",
            href: "/condo",
        },
        {
            name: "ผลงาน",
            href: "/review",
        },
        {
            name: "ติดต่อเรา",
            href: "/contact",
        }
    ];

    const service: LinkProps[] = [
        {
            name: "ขนส่งมอเตอร์ไซต์",
            href: "/service",
        },
        {
            name: "ขนของย้ายบ้าน",
            href: "/service",
        },
        {
            name: "ข่นส่งสัตว์เลี้ยง",
            href: "/service",
        },
    ]

    return (
        <div className='bg-[#212529]/5 border-t border-[#212529]/10 py-10 lg:px-4'>
            <div className={cn("container mx-auto flex flex-col")}>
                <div className={cn('flex-col px-4 flex gap-8 lg:gap-4', 'lg:px-0 lg:gap-8 md:flex-row lg:justify-around')}>
                    {/* ที่อยู่ บ. */}
                    <div className='max-w-[380px]'>
                        <div className='flex flex-col items-center gap-4'>
                            <Image src='/kja.jpg' alt='logo' width={40} height={40} />
                            <h1 className='text-xl font-semibold text-primary'>Lorem, ipsum dolor.</h1>
                        </div>
                        <span className='text-[#444444] text-[14px] lg:text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam optio ex, voluptatem illum facilis odit?</span>
                        <ul className='list-disc ml-8 mt-4 text-[#444444] text-[14px] lg:text-base'>
                            <li>
                                <span><strong className='text-primary'>Phone : </strong> 099-9999999</span>
                            </li>
                            <li>
                                <span><strong className='text-primary'>Email :</strong> lorem@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                    <div className='gap-4 flex flex-row md:flex-row flex-wrap justify-between w-full text-[#444444] text-[14px] lg:text-base'>
                        {/* Link */}
                        <div className='max-w-[250px] '>
                            <h6 className='font-semibold text-primary text-base'>ลิงค์ที่มีประโยชน์</h6>
                            <ul className='list-disc ml-8 mt-1 marker:text-sm space-y-1'>
                                {link.map((item, index) => (
                                    <li key={index + 1}>
                                        <a href={item.href}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* บริการ */}
                        <div className='max-w-[250px]'>
                            <h6 className='font-semibold text-primary text-base'>บริการ</h6>
                            <ul className='list-disc ml-8 mt-1 marker:text-sm space-y-1'>
                                {service.map((item, index) => (
                                    <li key={index + 1}>
                                        <a href={item.href}>{item.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* social */}
                        <div className='max-w-[250px] space-y-2'>
                            <h6 className='font-semibold text-primary text-base'>ติดตามข่าวสารที่นี่</h6>
                            <ul className='flex gap-4'>
                                <li><Image src={line} alt='logo' width={25} height={25} /></li>
                                <li><Image src={facebook} alt='logo' width={25} height={25} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-10 text-primary font-medium'>
                    <span>ลิขสิทธิ์ © 2568 Lorem, ipsum dolor.</span>
                </div>
            </div>
        </div>
    )
}

export default Footer