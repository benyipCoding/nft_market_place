import Image from 'next/image';
import images from '@/assets';
import React from 'react';

const Logo = () => {
  return (
    <>
      <Image
        src={images.logo02}
        objectFit="contain"
        width={32}
        height={32}
        alt="logo"
      />
      <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
        CryptoKet
      </p>
    </>
  );
};

const PureLogo = React.memo(Logo);

export default PureLogo;
