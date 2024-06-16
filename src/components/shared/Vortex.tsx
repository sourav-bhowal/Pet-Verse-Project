import React from "react";
import { Vortex } from "../ui/vortex";
import Link from "next/link";

export function VortexDemoSecond() {
  return (
    <div className="w-[98%] mx-auto rounded-lg h-[100vh] overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white lg:text-6xl text-[47px] font-bold text-center">
          Welcome to Pet World
        </h2>
        <p className="text-white text-lg md:text-2xl max-w-xl mt-6 text-center">
          Pet World is the most popular platform for pet buyers and sellers.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 hover:text-black font-semibold rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            <Link href="/buy-pet">Get Started</Link>
          </button>
        </div>
      </Vortex>
    </div>
  );
}
