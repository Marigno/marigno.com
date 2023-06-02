//src/pages/nft.jsx
import React, { useEffect, useState } from "react";
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
    
      try {
        const response = await axios.get(`${corsProxy}https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=50`);
    
        if (response.data) {
          console.log("Response data:");
          console.log(response.data);
          const nftsData = response.data.assets;
          const metadataWithImages = nftsData.map((nft) => ({
            tokenId: parseInt(nft.token_id, 10),
            image: nft.image_url,
            title: nft.name,
            contractAddress: nft.asset_contract.address,
            collectionName: nft.collection.name,
          }));
    
          // Filter NFTs created by you
          const createdNfts = metadataWithImages.filter(nft => nft.contractAddress.toLowerCase() === walletAddress.toLowerCase());
          setNfts(createdNfts);
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchNfts();
  }, []);

  const NFT = ({ nft }) => {
    const openSeaCollectionUrl = `https://opensea.io/collection/${nft.tokenSymbol.toLowerCase()}`;
    const openSeaNFTUrl = `https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.tokenID}`;
    return (
      <NFTWrapper>
        <a href={openSeaNFTUrl} target="_blank" rel="noopener noreferrer">
          <h3>{nft.tokenName}</h3>
        </a>
        <CollectionInfo>
            Collection:{" "}
            <a href={openSeaCollectionUrl} target="_blank" rel="noopener noreferrer">
              <h4>{nft.tokenSymbol}</h4>
            </a>
          </CollectionInfo>
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