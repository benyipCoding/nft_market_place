import Link from 'next/link';
import React from 'react';

export type MenuText = 'Explore NFTs' | 'Listed NFTs' | 'My NFTs' | '';

interface MenuItemsProps {
  isMobile: boolean;
  active: MenuText;
  setActive: React.Dispatch<React.SetStateAction<MenuText>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  isMobile,
  active,
  setActive,
  setIsOpen,
}) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  const handleLinkClick = (path: string) => {
    if (window.location.pathname === path) return;
    setIsOpen && setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {(['Explore NFTs', 'Listed NFTs', 'My NFTs'] as MenuText[]).map(
        (item, index) => (
          <li
            key={index}
            onClick={() => setActive(item)}
            className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
              active === item
                ? 'dark:text-white text-nft-black-1'
                : 'dark:text-nft-gray-3 text-nft-gray-2'
            }`}
          >
            <Link
              href={generateLink(index)}
              onClick={() => handleLinkClick(generateLink(index))}
            >
              {item}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default MenuItems;
