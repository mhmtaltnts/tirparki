"use client";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogIn,
} from "lucide-react";

import { useState } from "react";

import Image from "next/image";
import MainLink from "@/components/main-nav/mainLink";
import Link from "next/link";
import { auth } from "./api/auth/[...nextauth]/auth";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";

const Slider = ({ id }: { id: string | undefined }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const preSlide = () => {
    setImageIndex(imageIndex === 0 ? data.length - 1 : (pre) => pre - 1);
  };
  const nextSlide = () => {
    setImageIndex(imageIndex === data.length - 1 ? 0 : (pre) => pre + 1);
  };

  const data = [
    "/img/konak-park-1.jpg",
    "/img/konak-park-2.jpg",
    "/img/konak-park-3.jpg",
    "/img/konak-park-4.jpg",
    "/img/konak-park-5.jpg",
  ];
  return (
    <main className="relative h-[calc(100vh)] w-full overflow-hidden">
      <h1 className="absolute left-1/2 top-[100px] z-10 -translate-x-1/2 -translate-y-1/2 text-3xl">
        HOŞ GELDİNİZ
      </h1>
      <div
        className="flex h-full w-max transition-all duration-1000 ease-in-out"
        style={{ transform: `translateX(-${imageIndex * 100}vw)` }}
      >
        {data.map((item, index) => (
          <div className="relative h-full w-screen" key={index}>
            <Image src={item} alt="slider" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-1/2 flex w-full justify-between">
        <div
          className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-7xl font-extrabold text-gray-100 opacity-60"
          onClick={preSlide}
        >
          <ChevronLeft size="xs" />
        </div>
        <div
          className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center text-7xl font-extrabold text-gray-100 opacity-60"
          onClick={nextSlide}
        >
          <ChevronRight size="xs" />
        </div>
      </div>
      <div className="align-center absolute bottom-24 flex w-full items-center justify-center gap-4">
        {data.map((img, index) => (
          <div
            className={`flex h-3 w-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-100 ${
              imageIndex === index ? "scale-150" : ""
            }`}
            key={img}
            onClick={() => setImageIndex(index)}
          >
            {imageIndex === index && (
              <div className="h-[6px] w-[6px] rounded-full bg-gray-100"></div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-[25px] left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-3xl">
        <nav className="flex items-center space-x-1">
          {id ? (
            <Link href="/dashboard">
              <Button>
                <LayoutDashboard />
                Yönetim
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button>
                <LogIn />
                Giriş
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
};

export default Slider;
