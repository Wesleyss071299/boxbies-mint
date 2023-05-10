import Head from 'next/head'
import MainContainer from '@/components/MainContainer'
import DesContainer from '@/components/DesContainer'
import MintContainer from '@/components/MintContainer'
import NFT from '@/components/NFT'
import StyledCountdown from '@/components/StyledCountdown'
import moment from 'moment';
import Logo from '@/components/Logo'
import MintButton from '@/components/MintButton'
import Menu from '@/components/Menu'
import Paraquedas from '@/components/Paraquedas'
import Boneco from '@/components/Boneco'
import BorderLinearProgress from '@/components/BorderLinearProgress'
import { useWindowSize } from 'rooks'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useProvider } from 'wagmi'
import  Contract from 'web3-eth-contract';
import abi from '../abi'
import Web3 from 'web3'
import { useCallback, useEffect, useState } from 'react'
import { NFTContractAddress, createNFTContract } from '@/utils/getContract'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { BigNumber } from 'ethers'
import QuantityButton from '@/components/QuantityButton'

const ogDate = moment('2023-05-10T15:00:00.000Z');
const whiteDate = moment('2023-05-10T15:30:00.000Z');
const publicDate = moment('2023-05-10T16:10:00.000Z');

const Home = () =>  {
  const { innerWidth } = useWindowSize();
  const { address, isConnected } = useAccount();
  const [contract, setContract] = useState(createNFTContract());
  const [totalMinted, setTotalMinted] = useState(0);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isOgListed, setIsOgListed] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isOnlyOg, setIsOnlyOg] = useState(false);
  const [isOnlyWl, setIsOnlyWl] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const canMint = useCallback(() => {
    if (!isConnected) return false;
  
    if (isPaused) return false;

    // if (moment().isBefore(ogDate)) return false;

    if (isOnlyOg && isOgListed) return true;

    if (isOnlyWl && isWhiteListed) return true;

    if (!isOnlyWl && !isOnlyOg) return true;

    return false;
  }, [isPaused, isOgListed, isWhiteListed, isOnlyOg, isOnlyWl, isConnected]);

  const setup = useCallback(async () => {
    if (!contract) return;

    const [
      minted,
      isWl,
      isOG,
      paused,
      onlyog,
      onlywl
    ] = await Promise.all([
      contract.methods.mintIndex().call(),
      address && contract.methods.isWhitelisted(address).call(),
      address && contract.methods.isOGlisted(address).call(),
      contract.methods.paused().call(),
      contract.methods.onlyOGlisted().call(),
      contract.methods.onlyWhitelisted().call(),
    ]);

    console.log({
      minted,
      isWl,
      isOG,
      paused,
      onlyog,
      onlywl
    });

    setTotalMinted(Number(minted));
    setIsWhiteListed(isWl);
    setIsOgListed(isOG);
    setIsPaused(paused);
    setIsOnlyOg(onlyog);
    setIsOnlyWl(onlywl);
  }, [contract, address]);

  const mint = useCallback(async () => {
    const gas = await contract.methods.mint(quantity).estimateGas({ from: address,  value: 10000000000000000000 * quantity });

    console.log({ gas });

    const gasPrice = Web3.utils.toWei('300', 'Gwei');
    await toast.promise(contract.methods.mint(quantity).send({
      from: address,
      value: 10000000000000000000 * quantity,
      gas: gas * 2,
      gasPrice,
    }), {
      loading: "Sending transaction...",
      success: <b>Success</b>,
      error: <b>Something went wrong!.</b>,
    });

    setup();
  }, [contract, address, setup, quantity]);

  const incrementQuantity = (q:number) => {
    if (quantity >= 10) {
      setQuantity(10);
      return;
    }

    setQuantity(q + 1);
  };

  const decrementQuantity = (q: number) => {
    if (quantity <= 0) {
      setQuantity(0);
      return;
    }

    setQuantity(q - 1);
  };

  useEffect(() => {
    setContract(createNFTContract());
    setup();
  }, []);


  return (
    <div>
      <Head>
        <title>Boxbies Mint Page</title>
        <meta name="description" content="Boxbies Mint Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/paraquedas.png" />
      </Head>
      <MainContainer>
        <div style={ { position: 'fixed', right: '1vw', top: '1vh'} }>
          <ConnectButton />
        </div>
        <Menu />
        <Logo src='logo.png'/>  
        <MintContainer>
        {innerWidth && innerWidth > 1000 && <><Paraquedas src="paraquedas.png"/></>}
        {innerWidth && innerWidth > 1000 && <><Boneco src="boneco.png"/></>}
          <DesContainer>
            <NFT>
              { !canMint() && isOgListed && <StyledCountdown
                title="OG List"
                date={ogDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />}
              { !canMint() && isWhiteListed && <StyledCountdown
                title="White List"
                date={whiteDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />}
             { !canMint() && !isOgListed && !isWhiteListed && <StyledCountdown
                title="Public"
                date={publicDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />}
              <h3 style={{ color: 'white', marginTop: '1vh' }}>Total Minted { totalMinted } / 1780</h3>
              <BorderLinearProgress  variant='determinate' value={ totalMinted / 1780 * 100 } />
              { canMint() && <div style={ { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'white' } }>
                <QuantityButton onClick={() => decrementQuantity(quantity)}style={{ fontSize: '30px', marginRight: '20px' }}>-</QuantityButton>
                <h3>{ quantity }</h3>
                <QuantityButton onClick={() => incrementQuantity(quantity)} style={{ fontSize: '30px', marginLeft: '20px' }}>+</QuantityButton>
              </div>}
              { canMint() && <MintButton src="mint.png" onClick={mint}/> }
            </NFT>
          </DesContainer>
        </MintContainer>
      </MainContainer>
    </div>
  )
}

export default Home;
