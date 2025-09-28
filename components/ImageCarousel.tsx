'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  '/images/carousel/1677545326590.jpeg',
  '/images/carousel/1677545412652.jpeg',
  '/images/carousel/1677545632438.jpeg',
  '/images/carousel/1677547264667.jpeg',
  '/images/carousel/1677545818917.jpeg',
  '/images/carousel/1677547157439.jpeg',
  '/images/carousel/1677547235840.jpeg',
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function ImageCarousel() {
  const [center, setCenter] = useState(0);

  const prev = useCallback(() => setCenter((c) => mod(c - 1, images.length)), []);
  const next = useCallback(() => setCenter((c) => mod(c + 1, images.length)), []);

  useEffect(() => {
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next]);

  // For each slide we compute its position relative to center: -1 (left), 0 (center), 1 (right)
  const getPos = (index: number) => {
    const half = Math.floor(images.length / 2);
    const d = mod(index - center, images.length);
    // normalize to -half..+half
    return d > half ? d - images.length : d;
  };

  // compute indices for the fixed three slots
  const leftIndex = mod(center - 1, images.length);
  const centerIndex = mod(center, images.length);
  const rightIndex = mod(center + 1, images.length);

  const slots = [leftIndex, centerIndex, rightIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg">
        <div className="flex items-center justify-center gap-6 px-4 md:px-0">
          {slots.map((imgIdx, slotPos) => {
            const isCenter = slotPos === 1;
            const scale = isCenter ? 1 : 0.86;
            const opacity = isCenter ? 1 : 0.45;

            return (
              <div
                key={`${imgIdx}-${slotPos}`}
                className={`relative flex-shrink-0 h-72 w-[80%] sm:w-[60%] md:w-1/3 max-w-[420px] transition-all duration-400 ease-in-out transform`}
                style={{
                  zIndex: isCenter ? 20 : 10,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <Image
                  src={images[imgIdx]}
                  alt={`Carousel image ${imgIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 33vw"
                  className={`object-cover rounded-lg shadow-md ${isCenter ? '' : 'filter grayscale'}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setCenter((c) => mod(c - 1, images.length))}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow-md text-zinc-800 hover:bg-white z-50"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => setCenter((c) => mod(c + 1, images.length))}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow-md text-zinc-800 hover:bg-white z-50"
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
