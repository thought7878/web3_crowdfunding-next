"use client"

import React from "react"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"
import { Sepolia } from "@thirdweb-dev/chains"

import { StateContextProvider } from "."
import { Sidebar } from "../components"

const MyThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider
      // desiredChainId={ChainId.Goerli}
      // clientId={process.env.CLIENT_ID}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={Sepolia}
    >
      {/* <Router> */}
      <StateContextProvider>
        <div className="text-white p-4 bg-[#13131a] flex">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            Navbar
            {children}
          </div>
        </div>
      </StateContextProvider>
      {/* </Router> */}
    </ThirdwebProvider>
  )
}

export default MyThirdwebProvider
