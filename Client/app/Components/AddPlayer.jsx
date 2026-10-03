'use client'
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { RiCloseLine, RiAddLine, RiImageAddLine, RiSave3Line, RiInformationLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PassContext } from '../Context/Games/PassContext'
import { BankContext } from '../Context/Games/BankContext'
import { PlayerContext } from '../Context/Games/PlayersContext'
import { GuessContext } from '../Context/Games/GuessContext'
import { AuctionContext } from '../Context/Games/AuctionContext'
import { RoundContext } from '../Context/Games/RoundContext'
import { OffsideContext } from '../Context/Games/OffsideContext'
import { PictureContext } from '../Context/Games/PictureContext'
import { SquadContext } from '../Context/Games/SquadContext'
import { TopTenContext } from '../Context/Games/TopTenContext'
import { ClubsContext } from '../Context/Games/ClubsContext'

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
    squadTitle: '',
    squadTeamOneName: '',
    squadTeamOneMembers: [],
    squadTeamOneMember: '',
    squadTeamTwoName: '',
    squadTeamTwoMembers: [],
    squadTeamTwoMember: '',
    title: '',
    questionOne: '',
    questionTwo: '',
    questionThree: '',
    questionFour: '',
    questionFive: '',
    questionSix: '',
    questionSeven: '',
    questionEight: '',
    questionNine: '',
    questionTen: '',
    questionEleven: '',
    questionTwelve: '',
    questionThirteen: '',
    namePlayerCarrer: '',
    clubsPlayer: [],
    clubPlayer: ''
  })

  const pathName = usePathname()
  const { addPlayer } = useContext(PassContext)
  const { addBank } = useContext(BankContext)
  const { addPlayerClos } = useContext(PlayerContext)
  const { addGuess } = useContext(GuessContext)
  const { addAuction } = useContext(AuctionContext)
  const { addRound } = useContext(RoundContext)
  const { addOffside } = useContext(OffsideContext)
  const { addTeam } = useContext(PictureContext)
  const { addSquad } = useContext(SquadContext)
  const { addTopTen } = useContext(TopTenContext)
  const { addNewPlayerClubs } = useContext(ClubsContext)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = (e) => {
    if (pathName === '/Admin/Bank') return addBank(e, formData.question, formData.answer)
    if (pathName === '/Admin/Password') return addPlayer(formData.image, formData.name, e)
    if (pathName === '/Admin/Offside') return addOffside(formData.clo)
    if (pathName === '/Admin/Players') return addPlayerClos(e, formData.playerName, formData.playerClos)
    if (pathName === '/Admin/Guess') return addGuess(e, formData.gussQuestion, formData.gussAnswer)
    if (pathName === '/Admin/Auction') return addAuction(e, formData.auction)
    if (pathName === '/Admin/Round') return addRound(e, formData.roundQuestion, formData.roundExamples)
    if (pathName === '/Admin/Team') return addTeam(formData.imageTeam, formData.teamName, formData.team)
    if (pathName === '/Admin/Squad') {
      return addSquad(
        e,
        formData.squadTitle,
        { name: formData.squadTeamOneName, members: formData.squadTeamOneMembers },
        { name: formData.squadTeamTwoName, members: formData.squadTeamTwoMembers }
      )
    }
    if (pathName === '/Admin/TopTen') {
      const {
        title,
        questionOne, questionTwo, questionThree, questionFour,
        questionFive, questionSix, questionSeven, questionEight,
        questionNine, questionTen, questionEleven, questionTwelve, questionThirteen
      } = formData

      return addTopTen(e, title, {
        questionOne, questionTwo, questionThree, questionFour,
        questionFive, questionSix, questionSeven, questionEight,
        questionNine, questionTen, questionEleven, questionTwelve, questionThirteen
      })
    }
    if (pathName === '/Admin/Clubs') {
      return addNewPlayerClubs(e, formData.namePlayerCarrer, formData.clubsPlayer)
    }
  }

  const FormSection = ({ label, children, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-foreground font-bold text-sm">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">
          {icon || <RiInformationLine />}
        </div>
        <span>{label}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )

  const CustomInput = ({ label, ...props }) => (
    <div className="space-y-1 flex-1">
      {label && <label className="text-[11px] font-bold text-muted ml-1">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-all text-xs font-medium"
      />
    </div>
  )

  const CustomTextArea = ({ label, ...props }) => (
    <div className="space-y-1 flex-1">
      {label && <label className="text-[11px] font-bold text-muted ml-1">{label}</label>}
      <textarea
        {...props}
        className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-all text-xs font-medium min-h-[90px]"
      />
    </div>
  )

  const getPageTitle = () => {
    const part = pathName.split('/').pop()
    const map = {
      Bank: 'إضافة سؤال بنك',
      Password: 'إضافة كلمة سر',
      Offside: 'إضافة شرط تسلل',
      Players: 'إضافة مسيرة لاعب',
      Guess: 'إضافة لغز',
      Auction: 'إضافة مزاد',
      Round: 'إضافة دور',
      Team: 'إضافة صورة فريق',
      Squad: 'إضافة تشكيل مباراة',
      TopTen: 'إضافة سجل توب تين',
      Clubs: 'إضافة مسيرة أندية'
    }
    return map[part] || `تهيئة بيانات ${part}`
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="absolute inset-0 bg-black/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl card-surface border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-surface shrink-0">
              <div>
                <h2 className="text-lg font-black text-foreground">{getPageTitle()}</h2>
                <p className="text-[10px] font-bold text-primary tracking-wider uppercase">
                  {pathName.split('/').pop()} Configuration
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="w-9 h-9 rounded-lg bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {/* Content Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {pathName === '/Admin/Bank' && (
                <FormSection label="بيانات السؤال">
                  <CustomInput
                    label="نص السؤال"
                    placeholder="اكتب السؤال هنا..."
                    value={formData.question}
                    onChange={(e) => handleChange('question', e.target.value)}
                  />
                  <CustomInput
                    label="الإجابة الصحيحة"
                    placeholder="اكتب الإجابة هنا..."
                    value={formData.answer}
                    onChange={(e) => handleChange('answer', e.target.value)}
                  />
                </FormSection>
              )}

              {pathName === '/Admin/Password' && (
                <FormSection label="بيانات كلمة السر">
                  <CustomInput
                    label="اسم اللاعب"
                    placeholder="اسم اللاعب المستهدف..."
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted ml-1 block">صورة اختيارية (اختياري)</label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl bg-surface-elevated border border-dashed border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer">
                        {formData.image ? (
                          <Image src={URL.createObjectURL(formData.image)} layout="fill" objectFit="cover" alt="preview" />
                        ) : (
                          <RiImageAddLine className="text-muted text-2xl" />
                        )}
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => handleChange('image', e.target.files[0])}
                        />
                      </div>
                      <span className="text-xs text-muted">يمكن تركها فارغة، لن تظهر في شاشة اللعبة</span>
                    </div>
                  </div>
                </FormSection>
              )}

              {pathName === '/Admin/Offside' && (
                <FormSection label="بيانات التسلل">
                  <CustomTextArea
                    label="شرط التسلل"
                    placeholder="اكتب الشرط (مثال: لاعب أرجنتيني توج بدوري الأبطال)..."
                    value={formData.clo}
                    onChange={(e) => handleChange('clo', e.target.value)}
                  />
                </FormSection>
              )}

              {pathName === '/Admin/Players' && (
                <FormSection label="بيانات اللاعب والتلميحات">
                  <CustomInput
                    label="اسم اللاعب"
                    placeholder="اسم اللاعب المستهدف..."
                    value={formData.playerName}
                    onChange={(e) => handleChange('playerName', e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted ml-1 block">قائمة التلميحات</label>
                    <div className="flex gap-2">
                      <CustomInput
                        placeholder="أدخل تلميحاً ثم اضغط إضافة..."
                        value={formData.playerClo}
                        onChange={(e) => handleChange('playerClo', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.playerClo.trim() === '') return
                          handleChange('playerClos', [...formData.playerClos, formData.playerClo.trim()])
                          handleChange('playerClo', '')
                        }}
                        className="px-4 rounded-xl bg-primary hover:bg-primary-hover text-background font-bold text-xs transition-all flex items-center gap-1 shrink-0"
                      >
                        <RiAddLine size={18} /> إضافة
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.playerClos.map((clue, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-foreground text-xs flex items-center gap-2"
                        >
                          <span>{clue}</span>
                          <RiCloseLine
                            className="cursor-pointer text-muted hover:text-danger"
                            onClick={() => handleChange('playerClos', formData.playerClos.filter((_, i) => i !== idx))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FormSection>
              )}

              {pathName === '/Admin/Guess' && (
                <FormSection label="بيانات اللغز">
                  <CustomTextArea
                    label="نص اللغز الكروي"
                    placeholder="اكتب اللغز..."
                    value={formData.gussQuestion}
                    onChange={(e) => handleChange('gussQuestion', e.target.value)}
                  />
                  <CustomInput
                    label="حل اللغز"
                    placeholder="اكتب الإجابة..."
                    value={formData.gussAnswer}
                    onChange={(e) => handleChange('gussAnswer', e.target.value)}
                  />
                </FormSection>
              )}

              {pathName === '/Admin/Auction' && (
                <FormSection label="بيانات المزاد">
                  <CustomInput
                    label="سؤال المزاد"
                    placeholder="مثال: أذكر أكبر عدد من اللاعبين..."
                    value={formData.auction}
                    onChange={(e) => handleChange('auction', e.target.value)}
                  />
                </FormSection>
              )}

              {pathName === '/Admin/Round' && (
                <FormSection label="بيانات الدور والأمثلة">
                  <CustomInput
                    label="موضوع الدور"
                    placeholder="مثال: أندية حققت البريميرليغ..."
                    value={formData.roundQuestion}
                    onChange={(e) => handleChange('roundQuestion', e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted ml-1 block">الأمثلة المقترحة</label>
                    <div className="flex gap-2">
                      <CustomInput
                        placeholder="أدخل مثالاً..."
                        value={formData.example}
                        onChange={(e) => handleChange('example', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.example.trim() === '') return
                          handleChange('roundExamples', [...formData.roundExamples, formData.example.trim()])
                          handleChange('example', '')
                        }}
                        className="px-4 rounded-xl bg-primary hover:bg-primary-hover text-background font-bold text-xs transition-all flex items-center gap-1 shrink-0"
                      >
                        <RiAddLine size={18} /> إضافة
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.roundExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-foreground text-xs flex items-center gap-2"
                        >
                          <span>{ex}</span>
                          <RiCloseLine
                            className="cursor-pointer text-muted hover:text-danger"
                            onClick={() => handleChange('roundExamples', formData.roundExamples.filter((_, i) => i !== idx))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FormSection>
              )}

              {pathName === '/Admin/Clubs' && (
                <FormSection label="بيانات مسيرة الأندية">
                  <CustomInput
                    label="اسم اللاعب"
                    placeholder="اسم اللاعب..."
                    value={formData.namePlayerCarrer}
                    onChange={(e) => handleChange('namePlayerCarrer', e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-muted ml-1 block">محطات الأندية (بالترتيب)</label>
                    <div className="flex gap-2">
                      <CustomInput
                        placeholder="اسم النادي..."
                        value={formData.clubPlayer}
                        onChange={(e) => handleChange('clubPlayer', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.clubPlayer.trim() === '') return
                          handleChange('clubsPlayer', [...formData.clubsPlayer, formData.clubPlayer.trim()])
                          handleChange('clubPlayer', '')
                        }}
                        className="px-4 rounded-xl bg-primary hover:bg-primary-hover text-background font-bold text-xs transition-all flex items-center gap-1 shrink-0"
                      >
                        <RiAddLine size={18} /> إضافة
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.clubsPlayer.map((club, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-foreground text-xs flex items-center gap-2"
                        >
                          <span>#{idx + 1} {club}</span>
                          <RiCloseLine
                            className="cursor-pointer text-muted hover:text-danger"
                            onClick={() => handleChange('clubsPlayer', formData.clubsPlayer.filter((_, i) => i !== idx))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FormSection>
              )}

              {pathName === '/Admin/TopTen' && (
                <FormSection label="سجل التوب تين">
                  <CustomInput
                    label="عنوان السجل"
                    placeholder="مثال: الهدافون التاريخيون لدوري الأبطال..."
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'questionOne', 'questionTwo', 'questionThree', 'questionFour',
                      'questionFive', 'questionSix', 'questionSeven', 'questionEight',
                      'questionNine', 'questionTen', 'questionEleven', 'questionTwelve', 'questionThirteen'
                    ].map((key, i) => (
                      <CustomInput
                        key={key}
                        label={i >= 10 ? `فخ #${i - 9} (سالب)` : `المركز #${i + 1}`}
                        placeholder="اسم الإجابة..."
                        value={formData[key]?.name || ''}
                        onChange={(e) => handleChange(key, { name: e.target.value })}
                      />
                    ))}
                  </div>
                </FormSection>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface border-t border-border shrink-0">
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <RiSave3Line size={16} />
                <span>حفظ ونشر التحدي</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AddPlayer
