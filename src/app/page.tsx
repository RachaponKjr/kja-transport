import CityInfo from "./_components/city-info";
import DetailService from "./_components/detail-service";
import InfoMainHome from "./_components/info-main-home";
import WhatService from "./_components/what-service";
import ReviewUse from "./review/_components/review-use";
import WorkReview from "./review/_components/work-review";

export default function Home() {
  return (
    <div className="space-y-6 lg:space-y-16 px-4">
      <InfoMainHome />
      <WhatService />
      <DetailService />
      <ReviewUse />
      <WorkReview />
      <CityInfo />
    </div>
  )
}
