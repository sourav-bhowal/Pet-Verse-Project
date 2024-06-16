"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export const WobbleCardDemo = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[95%] mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Pet are the most loveable things.
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active users, Pet World is the most
            popular platform for pet buyers and sellers.
          </p>
        </div>
        <Image
          src="https://wallpapercave.com/wp/wp2446980.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No hassle, no issues, everything in one place.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Come here select your favourite pet and buy it with ease.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art pet selling website. Pet World
            Site today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Find the perfect pet as per your need. Our team is constantly developing the platform for the use
            ease to buy and sell pets.
          </p>
        </div>
        <Image
          src="https://th.bing.com/th/id/OIP.0BkSdKUAj2jqe94Fmd52GQHaE8?rs=1&pid=ImgDetMain"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[2%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
