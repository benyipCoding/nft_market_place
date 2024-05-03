import { NFTContext } from '@/contexts/NFTContext';
import React, { useContext } from 'react';

interface InputProps {
  inputType: React.HTMLInputTypeAttribute | 'textarea';
  title: string;
  placeholder: string;
  handleClick: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  inputType,
  title,
  placeholder,
  handleClick,
}) => {
  const { nftCurrency } = useContext(NFTContext);

  const renderInput = () => {
    return inputType === 'number' ? (
      <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 py-3 px-4 flexBetween flex-row">
        <input
          type="number"
          className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
          placeholder={placeholder}
          onChange={handleClick}
        />
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
          {nftCurrency}
        </p>
      </div>
    ) : inputType === 'textarea' ? (
      <textarea
        rows={10}
        placeholder={placeholder}
        onChange={handleClick}
        className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 py-3 px-4"
      ></textarea>
    ) : (
      <input
        className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 py-3 px-4"
        placeholder={placeholder}
        onChange={handleClick}
        type="text"
      />
    );
  };

  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>
      {renderInput()}
    </div>
  );
};

export default Input;
