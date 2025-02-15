import HeadText from '@/components/ui/head-text'
import Image from 'next/image'
import React from 'react'

function ReviewUse() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeadText text='รีวิวส่วนหนึ่งจากผู้ใช้งานจริง' />
      <div className="text-center max-w-[500px] my-2 space-y-8 text-[#666666]">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto necessitatibus hic provident illo
        </span>
        <div className='w-full aspect-square sm:aspect-[16/12] p-6 border border-primary rounded-lg flex flex-col justify-between items-center'>
          <Image className='w-[5rem] aspect-square rounded-md bg-neutral-200/50' alt='' src={''} />
          <p className='text-[14px] font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil delectus quasi doloribus necessitatibus, ullam nam perspiciatis modi a ea quisquam placeat harum maxime fugiat repellendus.</p>
          <div className='space-y-2'>
            <h5 className='font-semibold text-primary text-xl'>Lorem, ipsum.</h5>
            <div className='space-x-2'>
              <span className='text-[14px]'>รีวิวผู้ใช้งานจริงจาก</span>
              <span className='font-semibold text-primary'>Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewUse