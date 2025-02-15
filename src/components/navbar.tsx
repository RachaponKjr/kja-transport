'use client';
import { cn } from "@/libs/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import line from "@/assets/icons/line.svg"
import facebook from "@/assets/icons/facebook.svg"
import { AlignJustify, X } from "lucide-react";

interface LinkProps {
    name: string;
    href: string;
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const link: LinkProps[] = [
        {
            name: "หน้าแรก",
            href: "/",
        },
        {
            name: "ขนส่งมอเตอร์ไซต์",
            href: "###",
        },
        {
            name: "ขนของย้ายบ้าน คอนโด",
            href: "###",
        },
        {
            name: "ผลงาน",
            href: "/review",
        },
        {
            name: "ติดต่อเรา",
            href: "###",
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            };
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
        <div className={cn(scrolled ? "shadow-lg border-b border-gray-600/50" : "shadow-none", "fixed lg:sticky top-0 w-full px-[16px] py-[12px] lg:mx-0 lg:px-[28px] h-min lg:h-[5rem] bg-white flex items-center justify-between lg:rounded-xl")}>
            <div className="flex flex-col w-full">
                <div className="flex gap-24 items-center h-full justify-between lg:justify-start w-full flex-row-reverse lg:flex-row">
                    <Image src={"/kja.jpg"} alt="logo" width={40} height={40} />
                    <div className=" hidden lg:flex">
                        <ul className="flex gap-8 ">
                            {link.map((item, index) => (
                                <li
                                    key={index + 1}
                                    className={
                                        cn("cursor-pointer text-[#333333] text-sm px-2 py-2 flex items-center relative  hover:text-primary font-medium",
                                            "hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-[2px] hover:before:bottom-0 hover:before:left-0 hover:before:bg-primary",
                                        )
                                    }
                                >
                                    <Link href={item.href}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isOpen ? (
                        <X className="block lg:hidden" onClick={() => setIsOpen(false)} />
                    ) : (
                        <AlignJustify className="block lg:hidden" onClick={() => setIsOpen(true)} />
                    )}
                </div>
                {isOpen && (
                    <div >
                        <ul className="flex flex-col gap-2">
                            {link.map((item, index) => (
                                <li
                                    key={index + 1}
                                    className={
                                        cn("cursor-pointer text-[#333333] text-sm px-2 py-2 flex items-center relative  hover:text-primary font-medium",
                                            "hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-[2px] hover:before:bottom-0 hover:before:left-0 hover:before:bg-primary",
                                        )
                                    }
                                >
                                    <Link href={item.href}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className=" hidden lg:flex">
                <ul className="flex gap-6">
                    <li className=" cursor-pointer"><Image src={line} alt="lineicon" width={24} height={24} /></li>
                    <li className=" cursor-pointer"><Image src={facebook} alt="facebook icon" width={24} height={24} /></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
