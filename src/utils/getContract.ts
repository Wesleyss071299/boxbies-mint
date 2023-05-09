import Web3 from "web3";
import abi from '../abi'

export const NFTContractAddress = "0x3Ef5e7F4FEa0EC985cB4f8F5CBCAb607820f9Fe7";

export const createNFTContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(abi as any, NFTContractAddress);
};