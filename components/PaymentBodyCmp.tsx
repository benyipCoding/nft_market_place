import { NFTItemType } from '@/types';
import React from 'react';

interface PaymentBodyCmpProps {
  nft: NFTItemType;
  nftCurrency: string;
}

const PaymentBodyCmp: React.FC<PaymentBodyCmpProps> = ({
  nft,
  nftCurrency,
}) => {
  return <div>test</div>;
};

export default PaymentBodyCmp;
