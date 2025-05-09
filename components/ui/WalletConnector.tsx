"use client";

import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  SolanaMobileWalletAdapter,
  createDefaultAuthorizationResultCache,
  createDefaultAddressSelector,
  createDefaultWalletNotFoundHandler
} from "@solana-mobile/wallet-adapter-mobile";

import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// Required for modal styling
import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletConnector: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        appIdentity: {
          name: "Crypto-Pay",
          uri: "https://solpay.mkdevs.in",
          icon: "https://solpay.mkdevs.in/favicon.ico",
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        addressSelector: createDefaultAddressSelector(), // New addition
        onWalletNotFound: createDefaultWalletNotFoundHandler(), 
        cluster: "devnet",
      }),
      new UnsafeBurnerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
