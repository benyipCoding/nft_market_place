const hre = require('hardhat');

async function main() {
  const NFTMarketPlace = await hre.ethers.getContractFactory('NFTMarketPlace');
  const nftMarketPlace = await NFTMarketPlace.deploy();

  await nftMarketPlace.deployed();

  console.log('NftMarketPlace deployed to:', nftMarketPlace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
