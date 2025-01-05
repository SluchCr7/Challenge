'use client'
import React, { useState , useContext, useEffect } from 'react'
import Image from 'next/image'
import { IoIosClose } from "react-icons/io";
import { PassContext } from '../Context/Games/PassContext';
import { BankContext } from '../Context/Games/BankContext';
import { usePathname } from 'next/navigation';
import { PlayerContext } from '../Context/Games/PlayersContext';
import { GussContext } from '../Context/Games/GussContext';
import { AuctionContext } from '../Context/Games/AuctionContext';
import { RoundContext } from '../Context/Games/RoundContext';
import { OffsideContext } from '../Context/Games/OffsideContext';
import { PictureContext } from '../Context/Games/PictureContext';
const AddPlayer = ({setShow , show}) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [question, setQuestion] = useState("")
  const [Answer, setAnswer] = useState("")
  const [Clo, setClo] = useState("")
  const [GussQuestion, setGussQuestion] = useState("")
  const [GussAnswer, setGussAnswer] = useState("")
  const [roundQuestion, setRoundQuestion] = useState('')
  const [roundExample, setRoundExample] = useState("")
  const [example, setExample] = useState('')
  const [playerName, setPlayerName] = useState("")
  const [playerClos, setPlayerClos] = useState([])
  const [playerClo , setPlayerClo] = useState("") 
  const [auction, setAuction] = useState("")
  const [imageTeam,setImageTeam] = useState("")
  const [TeamName, setTeamName] = useState("")
  const [Team, setTeam] = useState([])
  const [teamMember, setTeamMember] = useState("")  
  const { addPlayer } = useContext(PassContext)
  const { addBank } = useContext(BankContext)
  const { addPlayerClos } = useContext(PlayerContext)
  const { addGuss } = useContext(GussContext)
  const { addAuction } = useContext(AuctionContext)
  const {addRound} = useContext(RoundContext)
  const { addOffside } = useContext(OffsideContext)
  const {addTeam} = useContext(PictureContext)
  const pathName = usePathname()
  return (
    <div className={`${show ? "Result" : ""}`}>
      <div className={`${show ? "flex" : "hidden"} items-center flex-col gap-3 p-10 w-[90%] md:w-[600px] fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] rounded-sm bg-black border-[1px] border-yellow-700`}>
          {
          pathName === "/Admin/Bank" ?
            <>
              <div className='flex items-start flex-col gap-2 w-full'>
                <span className='text-sm text-yellow-600 tracking-[3px]'>question</span>
                <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={question} onChange={(e)=> setQuestion(e.target.value)} />
              </div>
              <div className='flex items-start flex-col gap-2 w-full'>
                <span className='text-sm text-yellow-600 tracking-[3px]'>Answer</span>
                <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={Answer} onChange={(e)=> setAnswer(e.target.value)} />
              </div>
            </>
          :
          pathName === "/Admin/Password"?
            <>
              <div className='w-[100%] flex justify-center items-center'>
                <input type="file" id='file' 
                    className='hidden'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="file" className='w-full p-3'>
                    <Image src={image ? URL.createObjectURL(image) : ""} alt='profile' width={80} height={80} className='w-[60%]' />
                </label>
              </div>
              <div className='flex items-start flex-col gap-2 w-full'>
                <span className='text-sm text-yellow-600 tracking-[3px]'>Name</span>
                <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={name} onChange={(e)=> setName(e.target.value)} />
              </div>
            </>
          :
          pathName === "/Admin/Offside" ?
            <>
              <div className='flex items-start flex-col gap-2 w-full'>
                  <span className='text-sm text-yellow-600 tracking-[3px]'>Clo</span>
                  <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={Clo} onChange={(e)=> setClo(e.target.value)} />
              </div>
            </>
            :
          pathName === "/Admin/Players" ?
            <>
              <div className='flex items-start flex-col gap-4 w-full'>
                <div className='flex items-start flex-col gap-4 w-full'>
                  <span className='text-sm text-yellow-600 tracking-[3px]'>Answer</span>
                  <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={playerName} onChange={(e)=> setPlayerName(e.target.value)} />
                </div>
                <div className='flex items-start flex-col gap-4 w-full'>
                  <span className='text-sm text-yellow-600 tracking-[3px]'>Clo</span>
                  <div className='flex items-center gap-2 flex-col md:flex-row w-full'>
                    <input className='md:w-[80%] w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id=""  value={playerClo} onChange={(e)=> setPlayerClo(e.target.value)} />
                    <button onClick={(e) => {setPlayerClos([...playerClos , playerClo]); setPlayerClo("")}} className='md:w-[20%] w-[100%] p-3 border-[1px] border-yellow-600 rounded-lg'>Add Clo</button>
                  </div>
                </div>
              </div>
            </>
            :   
          pathName === "/Admin/Auction" ?
            <>
              <div className='flex items-start flex-col gap-5 w-full'>
                  <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Auction question</span>
                    <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={auction} onChange={(e)=> setAuction(e.target.value)} />
                  </div>
              </div>
            </>        
            :
          pathName === "/Admin/Round" ?
            <>
              <div className='flex items-start flex-col gap-5 w-full'>
                  <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Round question</span>
                    <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={roundQuestion} onChange={(e)=> setRoundQuestion(e.target.value)} />
                  </div>
                  <div className='flex items-start flex-col gap-2 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Add Example Name</span>
                    <div className='flex items-center flex-col md:flex-row gap-3 w-full'>
                      <input className='md:w-[80%] w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" value={example} id="" onChange={(e) => setExample(e.target.value)}  />
                      <button onClick={(e) => { setRoundExample([...roundExample, example]); setExample("") }} className='md:w-[20%] w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg'>Add</button>
                    </div>
                  </div>  
              </div>
            </>
            :
          pathName === "/Admin/Guss" ?
            <>
              <div className='flex items-start flex-col gap-5 w-full'>
                  <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Guss question</span>
                    <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={GussQuestion} onChange={(e)=> setGussQuestion(e.target.value)} />
                  </div>
                  <div className='flex items-start flex-col gap-2 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Answer</span>
                    <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" value={GussAnswer} id="" onChange={(e) => setGussAnswer(e.target.value)}  />
                  </div>  
              </div>
            </>
            :
            pathName === "/Admin/Team" ?
            <>
              <div className='flex items-start flex-col gap-5 w-full'>
                  <div className='w-[80%] flex justify-center items-center'>
                    <input type="file" id='file' 
                        className='hidden'
                        onChange={(e) => setImageTeam(e.target.files[0])}
                    />
                    <label htmlFor="file" className='w-full p-3'>
                        <Image src={imageTeam ? URL.createObjectURL(imageTeam) : ""} alt='profile' width={80} height={80} className='w-[60%]' />
                    </label>
                  </div>
                  <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Team Name</span>
                    <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={TeamName} onChange={(e)=> setTeamName(e.target.value)} />
                  </div>
                  <div className='flex items-start flex-col gap-2 w-full'>
                    <span className='text-sm text-yellow-600 tracking-[3px]'>Members</span>
                    <div className='flex items-center flex-col md:flex-row gap-3 w-full'>
                      <input className='md:w-[80%] w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" value={teamMember} id="" onChange={(e) => setTeamMember(e.target.value)}  />
                      <button onClick={(e) => { setTeam([...Team, teamMember]); setTeamMember("") }} className='md:w-[20%] w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg'>Add</button>
                    </div>
                  </div>  
              </div>
            </>
            :              
            <>
            </>
          }
        <button
          onClick={(e) =>
            pathName === "/Admin/Bank" ?
              addBank(e, question, Answer) :
            pathName === "/Admin/Password" ?
              addPlayer(image, name, e) :
            pathName === "/Admin/Offside" ?
              addOffside(Clo) :
            pathName === "/Admin/Players" ?
              addPlayerClos(e, playerName, playerClos) :
            pathName === "/Admin/Guss" ?
              addGuss(e, GussQuestion, GussAnswer) :
            pathName === "/Admin/Auction" ?
              addAuction(e, auction) :
            pathName === "/Admin/Round" ?
              addRound(e, roundQuestion, roundExample) :
            pathName === "/Admin/Team" ?
              addTeam(imageTeam , TeamName , Team)
              :""}
          className='w-[100%] p-3 bg-white text-black font-bold'>Add
        </button>
        <span onClick={() => setShow(false)} className='absolute top-1 right-2 text-lg'><IoIosClose/></span>
      </div>
    </div>
  )
}

export default AddPlayer