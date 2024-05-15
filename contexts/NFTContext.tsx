'use client';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAddress, MarketAddressABI } from './constants';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import type { MetaMaskInpageProvider } from '@metamask/providers';
// @ts-ignore
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { FormInputType } from '@/app/create-nft/page';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NFTItemType } from '@/types';
import Image from 'next/image';

const client = ipfsHttpClient({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});

const fetchContract = (
  signerOrProvider: ethers.providers.JsonRpcSigner | ethers.providers.Provider
) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  uploadToIPFS: (file: File) => Promise<string | void>;
  createNFT: (
    formInput: FormInputType,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchNFTs: () => Promise<NFTItemType[] | null>;
  fetchMyNFTsOrListedNFTs: (type?: string) => Promise<NFTItemType[] | null>;
  buyNFT: (nft: NFTItemType) => Promise<void>;
}

export const NFTContext = createContext<INFTContext>({
  nftCurrency: '',
  connectWallet: async () => {},
  currentAccount: '',
  uploadToIPFS: async () => {},
  createNFT: async () => {},
  fetchNFTs: async () => null,
  fetchMyNFTsOrListedNFTs: async () => null,
  buyNFT: async () => {},
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
    window.location.reload();
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

  const createNFT = async (
    formInput: FormInputType,
    fileUrl: string,
    router: AppRouterInstance
  ) => {
    const { name, description, price } = formInput;
    console.log(123);

    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      const added = await client.add(data);

      const url = `https://ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);

      router.push('/');
    } catch (error) {
      console.log('Error uploading file to IPFS.');
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling: boolean,
    id: number
  ) => {
    // connect wallet
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const price = ethers.utils.parseUnits(formInputPrice, 'ether');
      const contract = fetchContract(signer);
      const listingPrice = await contract.getListingPrice();

      const transaction = await contract.createToken(url, price, {
        value: listingPrice.toString(),
      });

      return transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
          // tokenURI方法是继承自ERC721URIStorage合约的方法
          const tokenURI = await contract.tokenURI(tokenId);
          console.log('fetching metadata');
          console.log(tokenURI);

          const { data } = await axios.get(tokenURI);
          const { image, name, description } = data;
          console.log('fetched');

          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (type: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    const data =
      type === 'fetchItemListed'
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
          // tokenURI方法是继承自ERC721URIStorage合约的方法
          const tokenURI = await contract.tokenURI(tokenId);
          console.log('fetching metadata');
          console.log(tokenURI);

          const { data } = await axios.get(tokenURI);
          const { image, name, description } = data;
          console.log('fetched');

          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const buyNFT = async (nft: NFTItemType) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    console.log({ price });

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
