"use client";

import "swiper/swiper-bundle.css";
import Image from "next/image";
import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Skeleton } from "@nextui-org/react";

interface CustomCarouselProps {
  items: string[];
  onSelect?: (item: string) => void;
  selectedItem: string | null;
  slidesPerView?: number;
  breakpoints?: Record<number, { slidesPerView: number }>;
  className?: string;
  loading?: boolean;
}

const CustomCarousel = ({
  items,
  onSelect,
  selectedItem,
  slidesPerView = 2,
  breakpoints = { 640: { slidesPerView: 3 }, 1024: { slidesPerView: 6 } },
  className,
  loading = false,
}: CustomCarouselProps) => {
  return (
    <Skeleton
      isLoaded={!loading}
      className="rounded-[2rem]"
      classNames={{ base: "dark" }}
    >
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className={`relative ${className}`}
      >
        {items.map((item) => (
          <SwiperSlide key={item}>
            <div
              onClick={() => onSelect?.(item)}
              className={`relative w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden border-2 cursor-pointer ${selectedItem === item ? "border-blue-500" : "border-transparent"}`}
            >
              <Image
                src={item}
                alt="Opción"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {selectedItem === item && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <span className="text-white font-bold">✔</span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}

        <div className={`swiper-button-prev ${styles.custom_swiper_button}`}></div>
        <div className={`swiper-button-next ${styles.custom_swiper_button}`}></div>
      </Swiper>
    </Skeleton>
  );
};

export default CustomCarousel;
