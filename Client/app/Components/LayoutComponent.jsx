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
import { AnimatePresence, motion } from "framer-motion";

const LayoutComponent = ({ children }) => {
  const [showProfile, setShowProfile] = useState(false)

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
                              <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
                                <Nav setShowProfile={setShowProfile} />

                                <main className="w-full pt-32 pb-20 px-4">
                                  {children}
                                </main>

                                {/* Modal Container */}
                                <AnimatePresence>
                                  {showProfile && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="fixed inset-0 w-full h-full flex items-center justify-center z-[1000] p-4"
                                    >
                                      {/* Backdrop */}
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowProfile(false)}
                                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                      />

                                      {/* Modal Content */}
                                      <Profile setShowProfile={setShowProfile} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
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