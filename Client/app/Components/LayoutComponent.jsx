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
import { TopTenContextProvider } from "../Context/Games/TopTenContext";
import { SquadContextProvider } from "../Context/Games/SquadContext";
import { ClubsContextProvider } from "../Context/Games/ClubsContext";
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
                            <TopTenContextProvider>
                            <SquadContextProvider>
                              <ClubsContextProvider>
                                <div className="flex items-center flex-col gap-2">
                                    <Nav setShowProfile={setShowProfile} />
                                    {children}
                                    <div className={`${showProfile ? "Result" : ""} w-full`}>
                                        <div className={`${showProfile ? "flex" : "hidden"} absolute top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-50 z-[999]`}>
                                          <Profile setShowProfile={setShowProfile} />
                                        </div>
                                    </div>
                                </div>
                                </ClubsContextProvider>
                              </SquadContextProvider>
                            </TopTenContextProvider>
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