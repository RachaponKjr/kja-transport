import HeadText from '@/components/ui/head-text'
import React from 'react'

function CityInfo() {
    return (
        <div>
            <HeadText text='รายชื่อจังหวัดที่ให้บริการ' />
            <div className='my-8 space-y-6'>
                <Info info='กรุงเทพมหานคร อุทัยธานี ชัยนาท นครสวรรค์ นนทบุรี ปทุมธานี พระนครศรีอยุธยา ลพบุรี สมุทรปราการ สมุทรสงคราม สมุทรสาคร สระบุรี สิงห์บุรี อ่างทอง' titel='ภาคกลาง' />
                <Info info='เชียงใหม่ แม่ฮ่องสอน เชียงราย ลำพูน ลำปาง พะเยา แพร่ น่าน อุตรดิตถ์ ตาก สุโขทัย พิษณุโลก กำแพงเพชร เพชรบูรณ์ พิจิตร' titel='ภาคเหนือ' />
                <Info info='กาฬสินธุ์ ขอนแก่น ชัยภูมิ นครพนม นครราชสีมา บุรีรัมย์ มหาสารคาม มุกดาหาร ยโสธร ร้อยเอ็ด เลย ศรีสะเกษ สกลนคร สุรินทร์ หนองคาย หนองบัวลำภู อุดรธานี อุบลราชธานี อำนาจเจริญ' titel='ภาคตะวันออกเฉียงเหนือ' />
                <Info info='ชลบุรี ระยอง จันทบุรี ตราด นครนายก ฉะเชิงเทรา ปราจีนบุรี สระแก้ว' titel='ภาคตะวันออก' />
                <Info info='กาญจนบุรี ประจวบคีรีขันธ์ สุพรรณบุรี เพชรบุรี นครปฐม ราชบุรี' titel='ภาคตะวันตก' />
                <Info info='กระบี่ ชุมพร ตรัง นครศรีธรรมราช นราธิวาส ปัตตานี พังงา พัทลุง ภูเก็ต ยะลา ระนอง สงขลา สตูล สุราษฎร์ธานี' titel='ภาคใต้' />
            </div>
        </div>
    )
}

const Info = ({ titel, info }: { titel: string, info: string }) => {
    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-lg lg:text-xl text-primary font-semibold'>{titel}</h4>
            <span className='text-[#444444] text-[14px] lg:text-base'>{info}</span>
        </div>
    )
}

export default CityInfo