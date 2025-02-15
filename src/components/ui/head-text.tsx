import React from 'react'

function HeadText({ text }: { text: string }) {
    return (
        <div className='text-center text-2xl font-semibold text-white bg-primary py-[22px] rounded-lg w-full'>{text}</div>
    )
}

export default HeadText