'use client';
import { Banner, CreatorCards, NFTCard } from '@/components';
import React, { useContext, useEffect, useState } from 'react';
import image from '@/assets';
import { NFTContext } from '@/contexts/NFTContext';
import { NFTItemType } from '@/types';
import { shortenAddress } from '@/utils/shortenAddress';

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState<NFTItemType[]>([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (!items) return;
      setNfts(items);
    });
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />
        <CreatorCards />

        {/* Hot Bids */}
        <section className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Hot Bids
            </h1>
            <div>SearchBar</div>
          </div>
          <div className="mt-3 flex w-full flex-wrap">
            {nfts.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                nft={{
                  index: nft.tokenId,
                  name: nft.name,
                  seller: nft.seller,
                  owner: nft.owner,
                  description: nft.description,
                  price: nft.price,
                  image: nft.image,
                }}
              />
            ))}

            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <NFTCard
                key={`nft-${index + 1}`}
                nft={{
                  index,
                  name: `Nifty NFT ${index + 1}`,
                  seller: `0xabc...efgd`,
                  owner: `0xabc...efgd`,
                  description: `Cool NFT on Sale`,
                  price: (10 - item * 0.534).toFixed(2),
                  // @ts-ignore
                  image: image[`nft${item}`],
                }}
              />
            ))} */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
