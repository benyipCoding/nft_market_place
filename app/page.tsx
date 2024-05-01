'use client';
import { Banner, CreatorCard } from '@/components';
import React, { useEffect, useRef, useState } from 'react';
import images from '@/assets';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Home = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const handleHorizontalScroll = (e: WheelEvent) => {
    const { current } = scrollRef;
    if (!current) return;
    if (current.scrollLeft === 0 && e.deltaY < 0) return;
    if (
      current.offsetWidth + current.scrollLeft >= current.scrollWidth &&
      e.deltaY > 0
    )
      return;
    e.preventDefault();
    scrollRef.current!.scrollLeft += e.deltaY * 10;
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (!current || !parent) return;
    if (current.scrollWidth >= parent.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    const scrollDiv = document.querySelector('#scrollDiv');
    // @ts-ignore
    scrollDiv!.addEventListener('wheel', handleHorizontalScroll);
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />

        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
              id="scrollDiv"
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  // @ts-ignore
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0xabc...efgd`}
                  creatorEths={10 - i * 0.5}
                />
              ))}

              {/* scroll buttons */}
              {!hideButtons && (
                <>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    onClick={() => handleScroll('left')}
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={`${theme === 'light' && 'filter invert'}`}
                    />
                  </div>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    onClick={() => handleScroll('right')}
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="left_arrow"
                      className={`${theme === 'light' && 'filter invert'}`}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
