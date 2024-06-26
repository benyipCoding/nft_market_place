import React, { useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { NFTContext } from '@/contexts/NFTContext';
import { shortenAddress } from '@/utils/shortenAddress';

type NftObject = {
  index: number;
  name: string;
  seller: string;
  owner: string;
  description: string;
  image: StaticImageData | string;
  price: string;
};

interface NFTCardProps {
  nft: NftObject;
  onProfilePage?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);
  console.log(nft);
  return (
    <Link
      href={{ pathname: '/nft-details', query: { nft: JSON.stringify(nft) } }}
    >
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 mind:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          {/* <Image
            src={nft.image}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.index}`}
          /> */}
          <img
            src={`${nft.image}`}
            alt={`nft${nft.index}`}
            className="h-full aspect-auto m-auto"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.price} <span className="normal">{nftCurrency}</span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
