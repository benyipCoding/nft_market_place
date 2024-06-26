'use client';
import React, { useContext, useEffect, useState } from 'react';
import images from '@/assets';
import { NFTItemType } from '@/types';
import { NFTContext } from '@/contexts/NFTContext';
import { Banner, Loader, NFTCard } from '@/components';
import Image from 'next/image';
import { shortenAddress } from '@/utils/shortenAddress';

const MyNFTs = () => {
  const [nfts, setNfts] = useState<NFTItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items) => {
      if (!items) return;
      setNfts(items);
      setIsLoading(false);
      console.log('@@@@@@@@', items);
    });
  }, []);

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col ">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
              alt="creator"
            />
          </div>
          <p className="dark:text-white font-poppins text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="dark:text-white font-poppins text-nft-black-1 font-extrabold text-3xl">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            SearchBar
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
