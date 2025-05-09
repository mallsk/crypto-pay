"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "@/components/ui/ThemeToggle";
import BalanceCard from "@/components/ui/BalanceCard";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Send, ScanLine,QrCode,Share2} from "lucide-react"
import ServiceGrid from "@/components/ui/ServiceGrid";
const QrScanner = dynamic(() => import("@/components/ui/QrScanner"), { ssr: false });

export default function Dashboard() {
  const { publicKey, sendTransaction, disconnect } = useWallet();
  const { connection } = useConnection();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  const [sendTo, setSendTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!publicKey) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
      return;
    }
    setWalletAddress(publicKey.toBase58());
    fetchTransactions();
  }, [publicKey]);

  const fetchTransactions = async () => {
    if (!publicKey) return;
  
    try {
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
      const txs = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await connection.getTransaction(sig.signature, {
            commitment: "confirmed",
          });
          return tx;
        })
      );
      setTransactions(txs.filter(Boolean)); // filter out nulls
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleDisconnectWallet = async () => {
    await disconnect();
    toast.success("Wallet disconnected");
    router.push("/");
  };

  const handleSendSol = async () => {
    if (!publicKey || !sendTo || !amount) {
      toast.error("Missing fields");
      return;
    }

    try {
      const lamports = Number(amount) * 1e9;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(sendTo),
          lamports,
        })
      );
      const signature = await sendTransaction(transaction, connection);
      toast.success("Transaction Successfull");
      setSendTo("");
      setAmount("");
      fetchTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed"+ error);
    }
  };

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Wallet address copied!");
    }
  };

  const handleScanSuccess = (data: string) => {
    setSendTo(data);
    setIsQRModalOpen(false);
    setIsSendModalOpen(true);
  };

  const handleShareQR = () => {
    if (walletAddress && navigator.share) {
      navigator.share({
        title: "Solana Wallet Address",
        text: walletAddress,
      });
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <Toaster />
      {publicKey ? (
        <div className="flex flex-col items-center px-4 py-6">
          {/* Top Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between mb-6 p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">SolPay</div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={handleDisconnectWallet}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
              >
                Disconnect
              </button>
            </div>
          </div>

          <BalanceCard />

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-4 gap-x-8 gap-y-4">
            <button onClick={() => setIsSendModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded shadow"><Send/></button>
            <button onClick={() => setIsQRModalOpen(true)} className="bg-yellow-500 text-white py-2 px-4 rounded shadow"><ScanLine/></button>
            <button onClick={() => setShowQR(true)} className="bg-green-500 text-white py-2 px-4 rounded shadow"><QrCode/></button>
            <button onClick={handleShareQR} className="bg-indigo-500 text-white py-2 px-4 rounded shadow"><Share2/></button>
          </div>

          {showQR && walletAddress && (
            <motion.div className="mt-6 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <QRCode value={walletAddress} size={128} />
              <div className="text-sm text-center break-all">{walletAddress}</div>
              <button onClick={copyToClipboard} className="bg-blue-600 text-white px-3 py-1 rounded">Copy</button>
            </motion.div>
          )}

          {/* Send Modal */}
          <AnimatePresence>
            {isSendModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Send SOL</h2>
                  <input
                    type="text"
                    placeholder="Recipient Public Key"
                    value={sendTo}
                    onChange={(e) => setSendTo(e.target.value)}
                    className="w-full p-2 mb-3 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Amount (in SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => setIsSendModalOpen(false)}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >Cancel</button>
                    <button
                      onClick={() => {
                        setIsSendModalOpen(false);
                        handleSendSol();
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >Send</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Scanner Modal */}
          <AnimatePresence>
            {isQRModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <QrScanner onScan={handleScanSuccess} onClose={() => setIsQRModalOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            <ServiceGrid />
          {/* Transaction History */}
          <div className="mt-10 w-full max-w-3xl">
  <h2 className="text-xl font-semibold mb-4">🧾 Recent Transactions</h2>

  {transactions.length > 0 ? (
    <div className="space-y-4">
      {transactions.map((tx, index) => {
        const status = tx.meta?.err ? "❌ Failed" : "✅ Success";
        const amountLamports = tx.meta?.postBalances?.[1] - tx.meta?.preBalances?.[1];
        const amountSol = amountLamports / 1e9;

        const sender = tx.transaction.message.accountKeys[0].toBase58();
        const receiver = tx.transaction.message.accountKeys[1].toBase58();

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-2"
          >
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Sender:</span> {sender}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Receiver:</span> {receiver}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Amount:</span> {amountSol.toFixed(4)} SOL
            </div>
            <div
              className={`text-sm font-medium ${
                tx.meta?.err ? "text-red-500" : "text-green-500"
              }`}
            >
              Status: {status}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No recent transactions found.</p>
  )}
</div>

        </div>
      ) : (
        <div className="text-center mt-10 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Connect Wallet
        </div>
      )}
    </div>
  );
}