
import { WobbleCardDemo } from "@/components/shared/WoobleCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-between lg:p-6 p-3 gap-5 bg-black">
      <div className="min-h-[90vh] w-full lg:p-4 p-2 rounded-xl flex flex-col justify-center items-center 
        lg:bg-[url('https://wallpapercave.com/wp/wp2534955.jpg')] lg:bg-center bg-[url('/dog2.png')] bg-right">
      <h2 className="text-white lg:text-7xl text-[47px] font-bold text-center">
          Welcome to Pet World
        </h2>
        <p className="text-white text-lg md:text-2xl max-w-xl mt-6 text-center font-semibold">
          Pet World is the most popular platform for pet buyers and sellers.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 hover:text-black font-semibold rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            <Link href="/buy-pet">Get Started</Link>
          </button>
        </div>
      </div>
      <WobbleCardDemo />
    </main>
  );
}
