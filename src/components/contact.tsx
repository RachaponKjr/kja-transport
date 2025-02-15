'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { IdCard, LineChart, Maximize2, MessageCircleIcon, Minimize2, Phone } from 'lucide-react';
import React, { useState } from 'react'

function Contect() {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        hidden: { opacity: 0, x: 0, y: 0 },
        visible: (index: number) => ({
            opacity: 1,
            x: 0,
            y: 0,
            transition: { delay: index * 0.1, type: "spring", stiffness: 100 },
        }),
        exit: { opacity: 0, x: 0, y: 0, transition: { duration: 0.2 } },
    };

    const buttons = [
        { icon: <IdCard />, color: "bg-green-500" },
        { icon: <Phone />, color: "bg-red-500" },
        { icon: <MessageCircleIcon />, color: "bg-blue-500" },
    ];

    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-center gap-2">
            <div className='flex flex-col-reverse gap-2 relative'>
                <AnimatePresence>
                    {isOpen &&
                        buttons.map((btn, index) => (
                            <motion.div
                                key={index}
                                className={`p-3 text-white rounded-full shadow-lg ${btn.color}`}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={variants}
                            >
                                {btn.icon}
                            </motion.div>
                        ))}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{ opacity: 1, x: -55, y: 0 }}
                            transition={{ delay: 0, stiffness: 100 }}
                            exit={{ opacity: 0, x: 0, y: 0, transition: { duration: 0.2 } }}
                            className='absolute bg-primary rounded-md shadow-lg w-min text-nowrap px-6 py-2 right-0 -bottom-[52px] text-white'>
                            <span>
                                ติดต่อสอบถาม
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.button
                className="p-3 bg-primary text-white rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <Minimize2 /> : <Maximize2 />}
            </motion.button>
        </div>
    )
}

export default Contect