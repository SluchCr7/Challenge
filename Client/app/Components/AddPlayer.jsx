'use client'
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { IoIosClose } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { PassContext } from '../Context/Games/PassContext'
import { BankContext } from '../Context/Games/BankContext'
import { PlayerContext } from '../Context/Games/PlayersContext'
import { GussContext } from '../Context/Games/GussContext'
import { AuctionContext } from '../Context/Games/AuctionContext'
import { RoundContext } from '../Context/Games/RoundContext'
import { OffsideContext } from '../Context/Games/OffsideContext'
import { PictureContext } from '../Context/Games/PictureContext'
import { SquadContext } from '../Context/Games/SquadContext'
import { TopTenContext } from '../Context/Games/TopTenContext'
const AddPlayer = ({ setShow, show }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    question: '',
    answer: '',
    clo: '',
    gussQuestion: '',
    gussAnswer: '',
    roundQuestion: '',
    roundExamples: [],
    example: '',
    playerName: '',
    playerClos: [],
    playerClo: '',
    auction: '',
    imageTeam: null,
    teamName: '',
    team: [],
    teamMember: '',
    squadTitle : '',
    squadTeamOneName: '',
    squadTeamOneMembers: [],
    squadTeamOneMember: '',
    squadTeamTwoName: '',
    squadTeamTwoMembers: [],
    squadTeamTwoMember: '',
    title: '',            // ✅ العنوان لمجموعة TopTen
    questionOne : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionTwo : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionThree : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionFour : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionFive : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionSix : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionSeven : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionEight : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionNine : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionTen : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionEleven : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionTwelve : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
    questionThirteen : "",      // ✅ الأسئلة بصيغة [{ name: '', value: 1 }]
  });


  const pathName = usePathname();
  const { addPlayer } = useContext(PassContext);
  const { addBank } = useContext(BankContext);
  const { addPlayerClos } = useContext(PlayerContext);
  const { addGuss } = useContext(GussContext);
  const { addAuction } = useContext(AuctionContext);
  const { addRound } = useContext(RoundContext);
  const { addOffside } = useContext(OffsideContext);
  const { addTeam } = useContext(PictureContext);
  const { addSquad } = useContext(SquadContext);
  const { addTopTen } = useContext(TopTenContext);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = (e) => {
    if (pathName === '/Admin/Bank') return addBank(e, formData.question, formData.answer);
    if (pathName === '/Admin/Password') return addPlayer(formData.image, formData.name, e);
    if (pathName === '/Admin/Offside') return addOffside(formData.clo);
    if (pathName === '/Admin/Players') return addPlayerClos(e, formData.playerName, formData.playerClos);
    if (pathName === '/Admin/Guss') return addGuss(e, formData.gussQuestion, formData.gussAnswer);
    if (pathName === '/Admin/Auction') return addAuction(e, formData.auction);
    if (pathName === '/Admin/Round') return addRound(e, formData.roundQuestion, formData.roundExamples);
    if (pathName === '/Admin/Team') return addTeam(formData.imageTeam, formData.teamName, formData.team);
    if (pathName === '/Admin/Squad') {
      return addSquad(e, 
        formData.squadTitle,
        { name: formData.squadTeamOneName, members: formData.squadTeamOneMembers }, 
        { name: formData.squadTeamTwoName, members: formData.squadTeamTwoMembers });
    }
    if (pathName === '/Admin/TopTen') {
      const {
        title,
        questionOne, questionTwo, questionThree, questionFour,
        questionFive, questionSix, questionSeven, questionEight,
        questionNine, questionTen, questionEleven, questionTwelve, questionThirteen
      } = formData;

      return addTopTen(e, title ,{
        questionOne, questionTwo, questionThree, questionFour,
        questionFive, questionSix, questionSeven, questionEight,
        questionNine, questionTen, questionEleven, questionTwelve, questionThirteen
      });
    }

  };

  return (
    <div className={`${show ? 'fixed inset-0 z-50 bg-black bg-opacity-60 overflow-y-auto' : 'hidden'}`}>
      <div className='flex items-center justify-center min-h-screen p-6'>
        <div className='relative w-full max-w-2xl bg-gray-100 dark:bg-gray-900 border border-yellow-500 p-6 rounded-xl shadow-lg flex flex-col gap-5'>
          <span onClick={() => setShow(false)} className='absolute top-3 right-4 text-yellow-600 text-2xl cursor-pointer hover:text-yellow-500 transition'><IoIosClose /></span>

          {pathName === '/Admin/Bank' && (
            <>
              <label className='text-yellow-600'>السؤال</label>
              <input type='text' className='input' value={formData.question} onChange={(e) => handleChange('question', e.target.value)} />
              <label className='text-yellow-600'>الإجابة</label>
              <input type='text' className='input' value={formData.answer} onChange={(e) => handleChange('answer', e.target.value)} />
            </>
          )}

          {pathName === '/Admin/Password' && (
            <>
              <label className='text-yellow-600'>صورة اللاعب</label>
              <input type='file' onChange={(e) => handleChange('image', e.target.files[0])} className='mb-2' />
              {formData.image && <Image src={URL.createObjectURL(formData.image)} width={100} height={100} alt='player' className='rounded-md' />}
              <label className='text-yellow-600'>الاسم</label>
              <input type='text' className='input' value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
            </>
          )}

          {pathName === '/Admin/Offside' && (
            <>
              <label className='text-yellow-600'>الوصف</label>
              <input type='text' className='input' value={formData.clo} onChange={(e) => handleChange('clo', e.target.value)} />
            </>
          )}

          {pathName === '/Admin/Players' && (
            <>
              <label className='text-yellow-600'>الاسم</label>
              <input type='text' className='input' value={formData.playerName} onChange={(e) => handleChange('playerName', e.target.value)} />
              <label className='text-yellow-600'>الإشارات</label>
              <div className='flex gap-2'>
                <input type='text' className='input flex-1' value={formData.playerClo} onChange={(e) => handleChange('playerClo', e.target.value)} />
                <button
                  onClick={() => handleChange('playerClos', [...formData.playerClos, formData.playerClo]) || handleChange('playerClo', '')}
                  className='btn border-yellow-600 text-yellow-600'>
                  إضافة
                </button>
              </div>
            </>
          )}

          {pathName === '/Admin/Guss' && (
            <>
              <label className='text-yellow-600'>السؤال</label>
              <input type='text' className='input' value={formData.gussQuestion} onChange={(e) => handleChange('gussQuestion', e.target.value)} />
              <label className='text-yellow-600'>الإجابة</label>
              <input type='text' className='input' value={formData.gussAnswer} onChange={(e) => handleChange('gussAnswer', e.target.value)} />
            </>
          )}

          {pathName === '/Admin/Auction' && (
            <>
              <label className='text-yellow-600'>سؤال المزاد</label>
              <input type='text' className='input' value={formData.auction} onChange={(e) => handleChange('auction', e.target.value)} />
            </>
          )}

          {pathName === '/Admin/Round' && (
            <>
              <label className='text-yellow-600'>السؤال</label>
              <input type='text' className='input' value={formData.roundQuestion} onChange={(e) => handleChange('roundQuestion', e.target.value)} />
              <label className='text-yellow-600'>مثال</label>
              <div className='flex gap-2'>
                <input type='text' className='input flex-1' value={formData.example} onChange={(e) => handleChange('example', e.target.value)} />
                <button onClick={() => handleChange('roundExamples', [...formData.roundExamples, formData.example]) || handleChange('example', '')} className='btn border-yellow-600 text-yellow-600'>إضافة</button>
              </div>
            </>
          )}

          {pathName === '/Admin/Team' && (
            <>
              <label className='text-yellow-600'>صورة الفريق</label>
              <input type='file' onChange={(e) => handleChange('imageTeam', e.target.files[0])} />
              {formData.imageTeam && <Image src={URL.createObjectURL(formData.imageTeam)} width={100} height={100} alt='team' className='rounded-md' />}
              <label className='text-yellow-600'>اسم الفريق</label>
              <input type='text' className='input' value={formData.teamName} onChange={(e) => handleChange('teamName', e.target.value)} />
              <label className='text-yellow-600'>أعضاء الفريق</label>
              <div className='flex gap-2'>
                <input type='text' className='input flex-1' value={formData.teamMember} onChange={(e) => handleChange('teamMember', e.target.value)} />
                <button onClick={() => handleChange('team', [...formData.team, formData.teamMember]) || handleChange('teamMember', '')} className='btn border-yellow-600 text-yellow-600'>إضافة</button>
              </div>
            </>
          )}
          {pathName === '/Admin/Squad' && (
            <>
              <label className='text-yellow-600'>Title Question</label>
              <input type='text' className='input' value={formData.squadTitle} onChange={(e) => handleChange('squadTitle', e.target.value)} />
              <div className='flex flex-col gap-4'>
                <h2 className='text-yellow-600 font-bold'>الفريق الأول</h2>
                <input type='text' placeholder='اسم الفريق' className='input' value={formData.squadTeamOneName} onChange={(e) => handleChange('squadTeamOneName', e.target.value)} />
                <div className='flex gap-2'>
                  <input type='text' className='input flex-1' value={formData.squadTeamOneMember} onChange={(e) => handleChange('squadTeamOneMember', e.target.value)} />
                  <button onClick={() => handleChange('squadTeamOneMembers', [...formData.squadTeamOneMembers, formData.squadTeamOneMember]) || handleChange('squadTeamOneMember', '')} className='btn border-yellow-600 text-yellow-600'>إضافة</button>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-yellow-600 font-bold mt-4'>الفريق الثاني</h2>
                <input type='text' placeholder='اسم الفريق' className='input' value={formData.squadTeamTwoName} onChange={(e) => handleChange('squadTeamTwoName', e.target.value)} />
                <div className='flex gap-2'>
                  <input type='text' className='input flex-1' value={formData.squadTeamTwoMember} onChange={(e) => handleChange('squadTeamTwoMember', e.target.value)} />
                  <button onClick={() => handleChange('squadTeamTwoMembers', [...formData.squadTeamTwoMembers, formData.squadTeamTwoMember]) || handleChange('squadTeamTwoMember', '')} className='btn border-yellow-600 text-yellow-600'>إضافة</button>
                </div>
              </div>
            </>
          )}
          {pathName === '/Admin/TopTen' && (
            <>
              <label className='text-yellow-600'>عنوان المجموعة</label>
              <input
                type='text'
                className='input'
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  'questionOne', 'questionTwo', 'questionThree', 'questionFour',
                  'questionFive', 'questionSix', 'questionSeven', 'questionEight',
                  'questionNine', 'questionTen', 'questionEleven', 'questionTwelve', 'questionThirteen'
                ].map((key, i) => (
                  <div key={key} className="flex flex-col gap-1">
                    <label className="text-yellow-600">{`السؤال ${i + 1}`}</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="اسم اللاعب أو الفريق"
                      value={formData[key]?.name || ''}
                      onChange={(e) =>
                        handleChange(key, { name: e.target.value }) // ❌ بدون value
                      }
                    />
                  </div>
                ))}
              </div>
            </>
          )}


          <button onClick={handleAdd} className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition'>حفظ</button>
        </div>
      </div>
    </div>
  )
}

export default AddPlayer
