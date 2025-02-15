import HeadText from '@/components/ui/head-text'
import { cn } from '@/libs/cn'
import Image from 'next/image'
import React from 'react'

function WorkReview() {
    return (
        <div className='space-y-4'>
            <HeadText text='ผลงานส่วนหนึ่งของเรา' />
            <div className={cn("grid grid-cols-2 gap-4", "md:grid-cols-3")}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <>
                        <Image src={'/bike-1.webp'} alt={'bike'} width={500} height={500} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default WorkReview