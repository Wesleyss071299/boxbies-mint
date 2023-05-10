import Web3 from "web3";
import abi from '../abi'

export const NFTContractAddress = "0x0ae568dfc0745387c504b240d8ade5e74b9fd2bb";

export const createNFTContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(abi as any, NFTContractAddress);
};

export const createNFTContractGet = () => {
  const web3 = new Web3('https://morning-weathered-fog.matic.discover.quiknode.pro/a28deafbeced08422cba57ed873fc6fddcf65a59/');
  return new web3.eth.Contract(abi as any, NFTContractAddress);
};
