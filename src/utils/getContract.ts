import Web3 from "web3";
import abi from '../abi'

export const NFTContractAddress = "0x0ae568dfc0745387c504b240d8ade5e74b9fd2bb";

export const createNFTContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(abi as any, NFTContractAddress);
};