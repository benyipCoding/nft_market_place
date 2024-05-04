'use client';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAddress, MarketAddressABI } from './constants';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import type { MetaMaskInpageProvider } from '@metamask/providers';
// @ts-ignore
import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});

interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File) => Promise<string | void>;
}

export const NFTContext = createContext<INFTContext>({
  nftCurrency: '',
  connectWallet: async () => {},
  currentAccount: '',
  uploadToIPFS: async (_file) => '',
});

export const NFTProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const ethereum = window.ethereum as MetaMaskInpageProvider;

    const accounts = (await ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[];

    setCurrentAccount(accounts[0]);

    // window.location.reload();
  };

  const uploadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log('Error uploading file to IPFS.');
    }
  };

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
