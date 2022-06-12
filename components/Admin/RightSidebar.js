import React from "react";
import LoggedInUser from "./LoggedInUser";
import Notifications from "./Notifications";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles 
import "swiper/css/bundle";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper";
import SystemUsers from "./SystemUsers";
import { CloudUploadIcon, UserGroupIcon } from "@heroicons/react/outline";
import RecentUploads from "./RecentUploads";


function RightSidebar({employees, documents, folders}) {
  return (
    <>
      <div className="hidden md:hidden lg:flex flex-col bg-blue-50 w-80 h-screen shadow overflow-y-scroll absolute right-0 z-40">
        {/* User profile and notifications */}
        <div className="flex flex-row py-5 px-4 justify-between items-center border-b-2">
          <Notifications />
          <LoggedInUser />
        </div>

        {/* Image Carousel */}
        <div className="p-2">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
          >
            <SwiperSlide>
              <Image
                src={"/gallery1.jpeg"}
                layout="responsive"
                width={200}
                height={150}
                blurDataURL={`/gallery1.jpeg`}
                placeholder="blur"
                alt="gallery1"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/gallery2.jpeg"}
                layout="responsive"
                width={200}
                height={150}
                blurDataURL={`/gallery2.jpeg`}
                placeholder="blur"
                alt="gallery2"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={"/gallery3.jpeg"}
                layout="responsive"
                width={200}
                height={150}
                blurDataURL={`/gallery3.jpeg`}
                placeholder="blur"
                alt="gallery3"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Users Status Stacked */}
        <div className="bg-white m-2 mt-4 shadow rounded-xl flex flex-col h-fit p-2">
          <div className="flex justify-between items-center mb-4  border-b-2">
            <strong>System Users</strong>
            <UserGroupIcon className="w-6 stroke-1" />
          </div>
          <SystemUsers employees={employees}/>
        </div>

        {/* Recents Uploads*/}
        <div className="bg-white p-3 m-2 mt-4 shadow rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <strong>Recent Uploads</strong>
            <CloudUploadIcon className="w-6 stroke-1" />
          </div>
          <RecentUploads documents={documents} folders={folders}/>
        </div>
      </div>
    </>
  );
}

export default RightSidebar;
