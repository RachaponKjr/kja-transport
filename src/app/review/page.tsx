'use client'
import React from "react";
import ReviewUse from "./_components/review-use";
import WorkReview from "./_components/work-review";
import { cn } from '../../libs/cn';

const page = () => {
    return (
        <>
            <div className={cn("px-4", "space-y-6 mb-8 mt-0 lg:px-4")}>
                <div className="mt-20 lg:mt-0 lg:space-y-1 flex flex-col items-center justify-center">
                    <h4 className="text-2xl text-primary font-semibold">ผลงานและรีวิวของเรา</h4>
                    <span>Lorem ipsum dolor sit amet consectetur.</span>
                </div>
                <ReviewUse />
                <WorkReview />
            </div>
        </>
    );
};

export default page;
