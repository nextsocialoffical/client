import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import { HiDotsVertical } from 'react-icons/hi'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import NFTCard from '../../components/NFTCard';
import { QUERY_NFTS } from "../../graphql/NFTs";
import { QUERY_PUBLICATIONS } from "../../graphql/PUBLICATIONS";
import useSWR from "swr";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socailIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Explore = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const { exploreId } = router.query
  const [collection, setCollection] = useState({})
  // const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const { data: nftsDataRes } = useSWR([
    QUERY_NFTS,
    {
      request: {
        ownerAddress: "0x54be3a794282c030b15e43ae2bb182e14c409c5e",
        chainIds: [80001],
        limit: 30,
      },
    },
  ]);

  const { data: publicationData } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request:"'0x12-0x01'"
    },
  ]); 
  
 const nfts = nftsDataRes?.data.nfts.items;
 console.log("nftsDataRes 2", nfts);

  // const nftModule = useMemo(() => {
  
    // if (!provider) return

    // const sdk = new ThirdwebSDK(
    //   provider.getSigner(),
    //   'https://polygon-mumbai.g.alchemy.com/v2/OYg4YFHni_hy3SaPyrAO4Z-BJZOkrqiM'
    // )
    // return sdk.getNFTModule(exploreId)
  // }, [provider])

  // useEffect(() => {
  //   if (!nfts) return
  //   ;(async () => {
  //     // const nfts = await nftModule.getAll()
  //     const nfts = nftsDataRes?.data.nfts.items;
  //     console.log("nftsDataRes 2", nfts);

  //     setNfts(nfts)
  //   })()
  // }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://polygon-mumbai.g.alchemy.com/v2/OYg4YFHni_hy3SaPyrAO4Z-BJZOkrqiM'
    )
    return sdk.getMarketplaceModule(
      '0x41d9d12aEbA405CFE2de426a11af705DF0B3914A'
    )
  }, [provider])

  // useEffect(() => {
  //   if (!marketPlaceModule) return
  //   ;(async () => {
  //     setListings(await marketPlaceModule.getAllListings())
  //   })()
  // }, [marketPlaceModule])

  const fetchCollectionData = async (sanityClient = client) => {
    // const query = `*[_type == "marketItems" && contractAddress == "${exploreId}"] {
    //   "imageUrl": profileImage.asset->url,
    //   "bannerImageUrl": bannerImage.asset->url,
    //   volumeTraded,
    //   createdBy,
    //   contractAddress,
    //   "creator": createdBy->userName,
    //   title, floorPrice,
    //   "allOwners": owners[]->,
    //   description
    // }`
    // const collectionData = await sanityClient.fetch(query)
    // console.log(collectionData)
    // await setCollection(collectionData[0])
  }

  useEffect(() => {
    fetchCollectionData()
  }, [exploreId])

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={collection?.bannerImageUrl ? collection.bannerImageUrl : ' '}
          alt=" "
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={collection?.imageUrl ? collection.imageUrl : ' '}
            alt=" "
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socailIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created By{' '}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              {/* <div className={style.statValue}>{nfts.length}</div> */}
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://polygon.nftically.com/images/blockchain-logos/polygon-matic-logo.svg"
                  alt="matic"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://polygon.nftically.com/images/blockchain-logos/polygon-matic-logo.svg"
                  alt="matic"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.2K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          {/* <div className={style.description}>{collection?.description}</div> */}
        </div>
      </div>
      <div className="flex flex-wrap">
      {nfts ? (
        nfts.map((nft, i) => {
          // return <NFT {...nft} key={i} />;
          return   <NFTCard
          key={id}
          nftItem={nftItem}
          title={nft?.name}
          listings={listings}
        />
        })
      ) : (
        <div>loading....</div>
      )}

      {
      // !nfts.length ?<div> No NFTs</div> : null
      }
        {/* {nfts.map((nftItem, id) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
          />
        ))} */}
      </div>
    </div>
  )
}

export default Explore