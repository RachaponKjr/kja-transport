import HeadText from '@/components/ui/head-text'
import Image from 'next/image'
import React from 'react'

function WhatService() {
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='flex-1'>
                <HeadText text='บริการของเรา' />
                <div className='space-y-12 mt-6 text-[#444444]'>
                    <div className='space-y-2'>
                        <h5 className='text-xl text-primary font-semibold'>บริการรถขนส่งสินค้าทุกชนิด</h5>
                        <p>หจก.พีพีแอนด์พี เอ็กซ์เพรส เราให้บริการรถรับจ้างขนส่งสินค้าขนาดใหญ่ทุกชนิด ด้วยประสบการณ์ทางด้านขนส่งที่มีมาอย่างยาวนาน บริการของเรานั้นจะรับประกันสินค้าว่าจะถึงปลายทางได้อย่างปลอดภัย</p>
                    </div>
                    <div className='space-y-2'>
                        <h5 className='text-xl text-primary font-semibold'>ให้คำปรึกษาเพื่อหาขนาดรถที่เหมาะกับการขนย้ายของ</h5>
                        <p>หจก.พีพีแอนด์พี เอ็กซ์เพรส ยังให้คำปรึกษาเพื่อหาขนาดรถที่เหมาะสมกับงานขนส่ง เช่นเมื่อท่านต้องการย้ายของในบ้านไปยังจุดหมายที่ต้องการ อาจจะใช้แค่รถกระบะ 4ล้อ ในการขนย้ายโดยไม่ต้องใช้รถ 6ล้อ ซึ่งจะประหยัดค่าใช้จ่ายในการขนส่งได้ครับ</p>
                    </div>
                    <ul className='list-disc list-inside '>
                        <li>จดทะเบียนเป็นนิติบุคคลอย่างถูกต้องตามกฎหมายในนาม ห้างหุ้นส่วนจำกัด พีพีแอนด์พี เอ็กซ์เพรส</li>
                        <li>เลขทะเบียนนิติบุคคล : 0103566008825</li>
                        <li>ความปลอดภัยเป็นสิ่งแรกที่เรานึกถึง</li>
                        <li>ตรวจสอบสถานะการขนส่งได้ตลอดเวลา</li>
                    </ul>
                </div>
            </div>
            <div className='flex justify-center items-center w-[450px] max-w-full my-12 lg:my-0'>
                <Image src={'/i.jpg'} alt={'bike'} width={300} height={300} />
            </div>
        </div>
    )
}

export default WhatService