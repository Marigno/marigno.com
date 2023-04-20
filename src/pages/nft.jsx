//src/pages/nft.jsx
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Helmet } from "react-helmet";
import Layout from "../layout/Layout";
import styled from "@emotion/styled";
import axios from "axios";
import config from "../../data/SiteConfig";
import getWeb3 from "../utils/web3";
import erc721Abi from "../erc721Abi";

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
      const corsProxy = "http://localhost:8080/";
      const walletAddress = "0x08255e706F23aB1F5703Eb717d8CfB5d097aE0F6";
      const contractAddresses = [
        "0x94D3188C143b6E544A1D5D375D27FF81c72A38c7",
        "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405",
        "0x60F80121C31A0d46B5279700f9DF786054aa5eE5",
      ];
      let fetchedNfts = [];
    
      const web3 = await getWeb3();
    
      for (const contractAddress of contractAddresses) {
        const contract = new web3.eth.Contract(erc721Abi, contractAddress);
        let balance;
    
        try {
          balance = await contract.methods.balanceOf(walletAddress).call();
        } catch (error) {
          console.error(`Error fetching balance for contract ${contractAddress}:`, error);
          continue;
        }
    
        for (let i = 0; i < balance; i++) {
          try {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call();
            const tokenURI = await contract.methods.tokenURI(tokenId).call();
            const tokenMetadata = await axios.get(`${corsProxy}${tokenURI}`).then((response) => response.data);
    
            fetchedNfts.push({
              tokenId,
              image: tokenMetadata.image,
              title: tokenMetadata.name,
              description: tokenMetadata.description,
              contractAddress: contractAddress,
              collectionName: tokenMetadata.collection,
            });
          } catch (error) {
            console.error(`Error fetching token at index ${i} for contract ${contractAddress}:`, error);
          }
        }
      }
    
      setNfts(fetchedNfts);
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