//src/pages/nft.jsx
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Helmet } from "react-helmet";
import Layout from "../layout/Layout";
import styled from "@emotion/styled";
import axios from "axios";
import config from "../../data/SiteConfig";

const NFTHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    height: 150px;
    width: auto;
    border-radius: 4px;
    margin-left: 0px;
  }
`;

const NFTContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const NFTWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: inherit;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const CollectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NFTPage = () => {
  const corsProxy = "http://localhost:8080/";
  const [nfts, setNfts] = useState([]);
  
  useEffect(() => {
    const fetchNfts = async () => {
      const walletAddress = "0x08255e706F23aB1F5703Eb717d8CfB5d097aE0F6";
      const collectionAddress = ["0x94D3188C143b6E544A1D5D375D27FF81c72A38c7", "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405", "0x60F80121C31A0d46B5279700f9DF786054aa5eE5"];
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}/getNFTs/`;
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      console.log(fetchURL);
      try {
        const nftData = await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json());
      
        if (nftData) {
          console.log("NFT data:");
          console.log(nftData.ownedNfts);
          const metadataWithIpfsImages = await Promise.all(nftData.ownedNfts.map(async (nft) => {
            try {
              let imgSrc;
              const imageUrl = nft.media[0].gateway;
  
              if (imageUrl.startsWith("ipfs://")) {
                const ipfsHash = imageUrl.replace("ipfs://", "");
                const ipfsUrl = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`;
                const ipfsResponse = await axios.get(`${corsProxy}${ipfsUrl}`, {
                  responseType: "arraybuffer",
                });
                const ipfsContentType = ipfsResponse.headers["content-type"];
                const base64Image = Buffer.from(ipfsResponse.data, "binary").toString("base64");
                imgSrc = `data:${ipfsContentType};base64,${base64Image}`;
              } else {
                imgSrc = imageUrl;
              }
  
              return {
                tokenId: parseInt(nft.id.tokenId, 16),
                image: imgSrc,
                title: nft.title,
                description: nft.description,
                contractAddress: nft.contract.address,
                collectionName: nft.contractMetadata.name,
              };
            } catch (error) {
              console.log(error);
              return null;
            }
          }));
  
          setNfts(metadataWithIpfsImages.filter(nft => nft !== null));
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };
  
    fetchNfts();
  }, []);

  const NFT = ({ nft }) => {
    const openSeaCollectionUrl = `https://opensea.io/collection/${nft.collectionName.toLowerCase()}`;
    const openSeaNFTUrl = `https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenId}`;
    return (
      <NFTWrapper>
        <a href={openSeaNFTUrl} target="_blank" rel="noopener noreferrer">
          <h3>{nft.title}</h3>
        </a>
        <img src={nft.image} alt={nft.title} />
        <CollectionInfo>
          Collection:{" "}
          <a href={openSeaCollectionUrl} target="_blank" rel="noopener noreferrer">
            <h4>{nft.collectionName}</h4>
          </a>
        </CollectionInfo>
        <p>{nft.description}</p>
      </NFTWrapper>
    );
  };
  
  return (
    <Layout>
      <Helmet title={`NFTs | ${config.siteTitle}`} />

      <NFTHeader>
        <h1>NFTs</h1>
        <p>Artist and photographer</p>
        <p>I capture images of what I like.</p>
      </NFTHeader>

      <NFTContainer>
      {nfts.map((nft, index) => (
        <NFT key={index} nft={nft} />
      ))}
    </NFTContainer>
    </Layout>
 );
};

export default NFTPage;