"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, Wallet, Zap, Shield, Smartphone, CheckCircle, Sparkles } from "lucide-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  const { setVisible } = useWalletModal();
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected && publicKey) {
      router.push("/dashboard");
    }
  }, [connected, publicKey, router]);
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-purple-950/20">
      <header className="px-4 lg:px-6 h-20 flex items-center backdrop-blur-sm bg-white/70 dark:bg-gray-950/70 sticky top-0 z-50 border-b border-purple-100 dark:border-purple-900/20">
        <Link className="flex items-center justify-center" href="#">
          <div className="relative w-10 h-10 mr-2">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full blur-sm opacity-70"></div>
            <div className="relative flex items-center justify-center h-full w-full bg-white dark:bg-gray-900 rounded-full border-2 border-purple-500">
              <Wallet className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-teal-500 text-transparent bg-clip-text">
            SolanaPay
          </span>
        </Link>
        
        <nav className="ml-auto">
        <div className="flex justify-center p-4 gap-4">
        <ThemeToggle />
          <Button onClick={()=> setVisible(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 px-4 py-2 text-sm w-fit">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-purple-700 dark:text-purple-400 font-medium">
                    Blockchain payments made simple
                  </span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                    Scan. Pay. <br />
                    <span className="bg-gradient-to-r from-purple-600 to-teal-500 text-transparent bg-clip-text">
                      Done.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400 leading-relaxed">
                    Forget complicated wallet addresses. SolanaPay works just like Google Pay or Phone Pay, but with the
                    power and security of Solana blockchain.
                  </p>
                </div>
                <div>
          <Button onClick={()=> setVisible(true)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 text-lg px-8 py-6 h-auto"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </Button>
                </div>

                <div className="flex items-center space-x-4 mt-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center bg-purple-100 dark:bg-purple-900/50"
                      >
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">{i}K+</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join thousands of users already enjoying seamless payments
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[600px] sm:w-[350px] sm:h-[700px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-900/50 rounded-3xl overflow-hidden shadow-2xl h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-600 to-teal-500 flex items-center justify-center">
                      <span className="text-white font-medium text-lg">Scan to Pay</span>
                    </div>
                    <div className="pt-20 px-4 flex flex-col items-center">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6 border border-purple-100 dark:border-purple-900/50 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <QrCode className="h-48 w-48 text-purple-600 relative z-10" />
                      </div>
                      <div className="w-full bg-gradient-to-r from-purple-50 to-teal-50 dark:from-purple-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-3">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Payment Complete</p>
                            <p className="text-sm text-gray-500">Coffee Shop • $4.50</p>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600">
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-20"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 px-4 py-2 text-sm w-fit">
                <span className="text-purple-700 dark:text-purple-400 font-medium">Simple 3-step process</span>
              </div>
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                  How It Works
                </h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  As simple as Google Pay or Phone Pay, but powered by Solana blockchain
                </p>
              </div>
            </div>

            <div className="grid gap-8 mt-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-6 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your Solana wallet to SolanaPay with a single click
                </p>
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-[250px] border border-purple-100 dark:border-purple-900/50 group-hover:border-purple-300 dark:group-hover:border-purple-700 transition-colors duration-300">
                  <Wallet className="h-32 w-32 mx-auto text-purple-600" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-teal-500 text-white mb-6 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors duration-300">
                  Scan QR Code
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Scan the merchant's QR code - no need to enter any wallet addresses
                </p>
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-[250px] border border-purple-100 dark:border-purple-900/50 group-hover:border-teal-300 dark:group-hover:border-teal-700 transition-colors duration-300">
                  <QrCode className="h-32 w-32 mx-auto text-teal-600" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-green-500 text-white mb-6 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-all duration-300">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors duration-300">
                  Confirm & Done
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Confirm the payment with a tap - payment completes instantly
                </p>
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-[250px] border border-purple-100 dark:border-purple-900/50 group-hover:border-green-300 dark:group-hover:border-green-700 transition-colors duration-300">
                  <CheckCircle className="h-32 w-32 mx-auto text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 px-4 py-2 text-sm w-fit">
                  <span className="text-purple-700 dark:text-purple-400 font-medium">Why choose SolanaPay</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                    Familiar Experience, <br />
                    <span className="bg-gradient-to-r from-purple-600 to-teal-500 text-transparent bg-clip-text">
                      Better Technology
                    </span>
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                    SolanaPay feels just like Google Pay or Phone Pay, but with all the benefits of blockchain
                    technology.
                  </p>
                </div>

                <div className="grid gap-4 mt-4">
                  <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors duration-300">
                        Instant Payments
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Payments complete in less than a second, just like your favorite payment apps
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-teal-600 transition-colors duration-300">
                        Lower Fees
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Pay a fraction of the fees compared to traditional payment processors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/50 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20 group-hover:shadow-green-500/40 transition-all duration-300">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors duration-300">
                        Works Everywhere
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Send money globally with the same ease as sending it locally
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900/50">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 rounded-xl">
                        <div className="mb-4 text-xl font-bold">Traditional Apps</div>
                        <div className="text-center text-sm text-gray-500 mb-6">Google Pay, Phone Pay</div>
                        <div className="flex items-center text-green-500 mb-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Easy to use</span>
                        </div>
                        <div className="flex items-center text-green-500 mb-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Scan & pay</span>
                        </div>
                        <div className="flex items-center text-red-500 mb-3">
                          <span className="ml-7">High fees</span>
                        </div>
                        <div className="flex items-center text-red-500">
                          <span className="ml-7">Limited global use</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center p-6 bg-gradient-to-b from-purple-50 to-teal-50 dark:from-purple-900/30 dark:to-teal-900/30 rounded-xl border-2 border-purple-500 shadow-lg">
                        <div className="mb-4 text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 text-transparent bg-clip-text">
                          SolanaPay
                        </div>
                        <div className="text-center text-sm text-gray-500 mb-6">Blockchain Simplified</div>
                        <div className="flex items-center text-green-500 mb-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Easy to use</span>
                        </div>
                        <div className="flex items-center text-green-500 mb-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Scan & pay</span>
                        </div>
                        <div className="flex items-center text-green-500 mb-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Minimal fees</span>
                        </div>
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Global payments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-purple-950/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-20"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 px-4 py-2 text-sm w-fit">
                <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                <span className="text-purple-700 dark:text-purple-400 font-medium">Start using SolanaPay today</span>
              </div>
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                  Ready to Try It?
                </h2>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Connect your wallet to experience seamless payments today
                </p>
              </div>
              <div className="mt-6">
                <Button onClick={()=> setVisible(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 text-lg px-8 py-6 h-auto"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-10 w-full border-t border-purple-100 dark:border-purple-900/20 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 mr-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full blur-sm opacity-70"></div>
                <div className="relative flex items-center justify-center h-full w-full bg-white dark:bg-gray-900 rounded-full border-2 border-purple-500">
                  <Wallet className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-teal-500 text-transparent bg-clip-text">
                SolanaPay
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 SolanaPay. All rights reserved.</p>
            <nav className="flex gap-6">
              <Link className="text-sm hover:text-purple-600 transition-colors duration-200" href="#">
                Terms
              </Link>
              <Link className="text-sm hover:text-purple-600 transition-colors duration-200" href="#">
                Privacy
              </Link>
              <Link className="text-sm hover:text-purple-600 transition-colors duration-200" href="#">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

