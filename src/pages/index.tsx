import Head from 'next/head'
import { Inter } from 'next/font/google'
import MainContainer from '@/components/MainContainer'
import WalletContainer from '@/components/WalletContainer'
import WalletAmount from '@/components/WalletAmount'
import { useState } from 'react'
import Wallet from '@/components/Wallet'
import DesContainer from '@/components/DesContainer'
import MintContainer from '@/components/MintContainer'
import NFT from '@/components/NFT'
import Price from '@/components/Price'
import ImageStyled from '@/components/ImageStyled'
import StyledCountdown from '@/components/StyledCountdown'
import moment from 'moment';
import Logo from '@/components/Logo'
import MintButton from '@/components/MintButton'
import ConnectButton from '@/components/ConnectButton'
import Menu from '@/components/Menu'
import Paraquedas from '@/components/Paraquedas'
import Boneco from '@/components/Boneco'
import BorderLinearProgress from '@/components/BorderLinearProgress'
import { useWindowSize } from 'rooks'

const inter = Inter({ subsets: ['latin'] })

const ogDate = moment('2023-05-10T09:00:00.000Z');
const whiteDate = moment('2023-05-10T09:30:00.000Z');
const publicDate = moment('2023-05-10T10:10:00.000Z');

export default function Home() {
  const [connected, setConnected] = useState(false);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  return (
    <>
      <Head>
        <title>Boxbies Mint Page</title>
        <meta name="description" content="Boxbies Mint Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/paraquedas.png" />
      </Head>
      <MainContainer>
        <Menu />
        <Logo src='logo.png'/>  
        <MintContainer>
        {innerWidth && innerWidth > 1000 && <Paraquedas src="paraquedas.png"/>}
        {innerWidth && innerWidth > 1000 && <Boneco src="boneco.png"/>}
          <DesContainer>
            <NFT>
              <StyledCountdown
                title="OG List"
                date={ogDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />
              <StyledCountdown
                title="White List"
                date={whiteDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />
              <StyledCountdown
                title="Public"
                date={publicDate.toDate()}
                onMount={({completed}) => console.log(completed)}
                onComplete={() => {
                    console.log('completeddddd')
                }}
              />
              <h3 style={{ color: 'white', marginTop: '1vh' }}>Total Minted 250 / 2000</h3>
              <BorderLinearProgress  variant='determinate' value={20} />
              <MintButton src="mint.png"/>
            </NFT>
          </DesContainer>
        </MintContainer>
      </MainContainer>
    </>
  )
}
