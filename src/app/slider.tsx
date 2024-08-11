'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';

const Slider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const preSlide = () => {
    setImageIndex(imageIndex === 0 ? data.length - 1 : (pre) => pre - 1);
  };
  const nextSlide = () => {
    setImageIndex(imageIndex === data.length - 1 ? 0 : (pre) => pre + 1);
  };

  const data = [
    '/img/konak-park-1.jpg',
    '/img/konak-park-2.jpg',
    '/img/konak-park-3.jpg',
    '/img/konak-park-4.jpg',
    '/img/konak-park-5.jpg',
  ];
  return (
    <main className="relative h-[calc(100vh-112px)] w-full overflow-hidden">
      <h1 className="absolute z-50 top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        HOŞ GELDİNİZ
      </h1>
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${imageIndex * 100}vw)` }}
      >
        {data.map((item, index) => (
          <div className="w-screen h-full relative " key={index}>
            <Image src={item} alt="slider" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex absolute bottom-1/2 w-full justify-between">
        <div
          className="opacity-60 cursor-pointer w-[50px] h-[50px] text-7xl text-gray-100 font-extrabold flex items-center justify-center"
          onClick={preSlide}
        >
          <ChevronLeft size="xs" />
        </div>
        <div
          className="opacity-60 cursor-pointer w-[50px] h-[50px] text-7xl  text-gray-100 font-extrabold flex items-center justify-center"
          onClick={nextSlide}
        >
          <ChevronRight size="xs" />
        </div>
      </div>
      <div className="absolute flex w-full bottom-24 items-center align-center justify-center gap-4">
        {data.map((img, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-100 cursor-pointer flex items-center justify-center ${
              imageIndex === index ? 'scale-150' : ''
            }`}
            key={img}
            onClick={() => setImageIndex(index)}
          >
            {imageIndex === index && (
              <div className="w-[6px] h-[6px] bg-gray-100 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Slider;
