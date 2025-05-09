"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BalanceCard() {
  const { publicKey, connected } = useWallet()
  const [showBalance, setShowBalance] = useState(false)
  const [balanceSOL, setBalanceSOL] = useState<number | null>(null)
  const [balanceUSD, setBalanceUSD] = useState<number | null>(null)
  const [balanceINR, setBalanceINR] = useState<number | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return
      try {
        const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/GcswhI71l1yJhdgFg45hRXIujXxWy8me`)
        const lamports = await connection.getBalance(publicKey)
        const sol = lamports / LAMPORTS_PER_SOL
        setBalanceSOL(sol)

        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,inr")
        const data = await res.json()
        const usdRate = data.solana.usd
        const inrRate = data.solana.inr

        setBalanceUSD(sol * usdRate)
        setBalanceINR(sol * inrRate)
      } catch (err) {
        console.error("Failed to fetch balance:", err)
      }
    }

    if (connected) {
      fetchBalance()
    }
  }, [publicKey, connected])

  const format = (val: number | null, prefix = "") =>
    showBalance ? `${prefix}${val?.toFixed(2)}` : "••••••••"

  return (
    <Card className="bg-gradient-to-r from-purple-400 to-emerald-500 text-white dark:text-black w-md">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Your Balance</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-white hover:bg-white/20"
          >
            {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>

        <Tabs defaultValue="sol" className="w-full">
          <TabsList className="bg-white/20 text-white border border-white/10 rounded-md">
            <TabsTrigger value="sol" className="data-[state=active]:bg-white/30">SOL</TabsTrigger>
            <TabsTrigger value="usd" className="data-[state=active]:bg-white/30">USD</TabsTrigger>
            <TabsTrigger value="inr" className="data-[state=active]:bg-white/30">INR</TabsTrigger>
          </TabsList>
          <TabsContent value="sol">
            <div className="text-3xl font-bold mt-2">{format(balanceSOL, "")} SOL</div>
          </TabsContent>
          <TabsContent value="usd">
            <div className="text-3xl font-bold mt-2">{format(balanceUSD, "$")}</div>
          </TabsContent>
          <TabsContent value="inr">
            <div className="text-3xl font-bold mt-2">{format(balanceINR, "₹")}</div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end items-center mt-4">
          <div className="text-xs opacity-80">Solana Blockchain</div>
        </div>
      </CardContent>
    </Card>
  )
}
