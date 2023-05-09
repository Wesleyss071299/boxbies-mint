import Web3 from "web3";
import abi from '../abi'

export const NFTContractAddress = "0x16DD5F71e19b1A00A1635fd4E98866057d36B078";

export const createNFTContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(abi as any, NFTContractAddress);
};