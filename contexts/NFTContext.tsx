'use client';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAddress, MarketAddressABI } from './constants';
import { PropsWithChildren, createContext } from 'react';

interface INFTContext {
  nftCurrency: string;
}

export const NFTContext = createContext<INFTContext>({ nftCurrency: '' });

export const NFTProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const nftCurrency = 'ETH';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
