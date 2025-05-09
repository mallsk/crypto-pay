"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import { 
  UnsafeBurnerWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import {
  createDefaultAuthorizationResultCache,
  createDefaultAddressSelector,
  createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter,
} from '@solana-mobile/wallet-adapter-mobile';

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

require("@solana/wallet-adapter-react-ui/styles.css");
const mobileWallet = new SolanaMobileWalletAdapter({
  addressSelector: createDefaultAddressSelector(),
  appIdentity: {
    name: 'Crypto-Pay',
    uri: 'https://solpay.mkdevs.in',
    icon: 'favicon.ico', // Path to your app's icon
  },
  authorizationResultCache: createDefaultAuthorizationResultCache(),
  cluster: WalletAdapterNetwork.Devnet, // or 'mainnet-beta' based on your setup
  onWalletNotFound: createDefaultWalletNotFoundHandler(),
});



export const WalletConnector: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={clusterApiUrl(WalletAdapterNetwork.Devnet)}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
