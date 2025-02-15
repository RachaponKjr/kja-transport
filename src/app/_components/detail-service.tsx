import HeadText from '@/components/ui/head-text'
import Image from 'next/image'
import React from 'react'

function DetailService() {
    return (
        <div className='space-y-4'>
            <HeadText text='รายละเอียดการให้บริการ' />
            <div className='space-y-8'>
                <div className='flex justify-center w-full'>
                    <Image src={'/bike-1.webp'} alt={'bike'} width={250} height={250} />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='space-y-8'>
                        <ListService
                            title='ประเภทรถที่ให้บริการขนส่งสินค้า'
                            info={['บริการรถรับจ้าง 4 ล้อ รถกระบะตู้ทึบ, กระบะคอก', 'บริการรถรับจ้าง 6 ล้อ ตู้ทึบ, คอก']} />
                        <ListService
                            title='เงื่อนไขการรับประกันสินค้า'
                            info={['รับประกันความเสียหายไม่เกิน 10,000 บาท']} />
                    </div>
                    <div>
                        <ListService
                            title='บริการของเรา'
                            info={[
                                'บริการรับจ้างขนของย้ายบ้าน ขนย้ายเฟอร์นิเจอร์ ย้ายสิ่งของ',
                                'บริการรับจ้างขนย้ายรถมอเตอร์ไซค์ ขนย้ายรถบิ๊กไบค์',
                                'บริการรับ-ส่งสินค้า ส่งของต่างจังหวัดทั่วประเทศ',
                                'บริการขนส่งสัตว์เลี้ยงทุกชนิด']} />
                    </div>
                    <div>
                        <ListService
                            title='อัตตราค่าบริการเริ่มต้น'
                            info={[
                                '1,000บาท ในพื้นที่ กทม',
                                '1,200บาท จาก กทม-ภาคตะวันออก',
                                '1,200บาท จาก กทม-ภาคตะวันตก',
                                '1,300บาท จาก กทม-ภาคอีสาน',
                                '1,500บาท จาก กทม-ภาคเหนือ',
                                '1,500บาท จาก กทม-ภาคใต้',
                            ]} />
                    </div>
                </div>
            </div>
        </div>
    )
}


const ListService = ({ title, info }: { title: string, info: string[] }) => {
    return (
        <div className='space-y-2'>
            <h5 className='text-lg lg:text-xl text-primary font-semibold'>{title}</h5>
            <ul className='list-disc list-inside ml-2 marker:text-sm text-[#444444] text-[14px] lg:text-base'>
                {info.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default DetailService