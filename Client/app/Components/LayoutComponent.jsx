'use client'
import { useState } from "react"
import Nav from "./Nav"
import Profile from "./Profile"
import AuthContextProvider from "../Context/AuthContext";
import ReskContextProvider from "../Context/Games/ReskContext";
import PassContextProvider from "../Context/Games/PassContext";
import PlayerContextProvider from "../Context/Games/PlayersContext";
import PictureContextProvider from "../Context/Games/PictureContext";
import GussContextProvider from "../Context/Games/GussContext";
import BankContextProvider from "../Context/Games/BankContext";
import OffsideContextProvider from "../Context/Games/OffsideContext";
import RoundContextProvider from "../Context/Games/RoundContext";
import AuctionContextProvider from "../Context/Games/AuctionContext";
const LayoutComponent = ({ children }) => {
    const [showProfile,setShowProfile] = useState(false)
    return (
        <AuthContextProvider >
          <ReskContextProvider>
            <PassContextProvider>
              <PlayerContextProvider>
                <PictureContextProvider>
                  <GussContextProvider>
                    <BankContextProvider>
                      <OffsideContextProvider>
                        <RoundContextProvider>
                        <AuctionContextProvider>
                          <div className="flex items-center flex-col gap-2">
                              <Nav setShowProfile={setShowProfile} />
                              {children}
                              <div className={`${showProfile ? "flex":"hidden"}`}>
                                  <Profile setShowProfile={setShowProfile} />
                              </div>
                          </div>
                          </AuctionContextProvider>
                        </RoundContextProvider>
                      </OffsideContextProvider>
                    </BankContextProvider>
                  </GussContextProvider>
                </PictureContextProvider>
              </PlayerContextProvider>
            </PassContextProvider>
          </ReskContextProvider>
        </AuthContextProvider>
    )
}
export default LayoutComponent