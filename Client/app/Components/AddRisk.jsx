'use client'
import React, { useContext, useState } from 'react'
import { RiCloseLine, RiAddLine, RiFlashlightLine, RiFocus2Line, RiFireLine, RiTrophyLine } from 'react-icons/ri';
import { RiskContext } from '../Context/Games/RiskContext';
import { motion, AnimatePresence } from 'framer-motion'

const AddRisk = ({ setShow, show }) => {
  const [name, setName] = useState("");
  const { addRisk } = useContext(RiskContext);
  const [easy, setEasy] = useState({ question: "", answer: "" });
  const [medium, setMedium] = useState({ question: "", answer: "" });
  const [hard, setHard] = useState({ question: "", answer: "" });
  const [expert, setExpert] = useState({ question: "", answer: "" });

  const tiers = [
    { label: 'Easy', state: easy, setState: setEasy, icon: <RiFocus2Line />, color: 'text-green-500' },
    { label: 'Medium', state: medium, setState: setMedium, icon: <RiFlashlightLine />, color: 'text-blue-500' },
    { label: 'Hard', state: hard, setState: setHard, icon: <RiFireLine />, color: 'text-amber-500' },
    { label: 'Expert', state: expert, setState: setExpert, icon: <RiTrophyLine />, color: 'text-primary' }
  ];

  const CustomInput = ({ label, ...props }) => (
    <div className="space-y-1.5 flex-1 w-full">
      {label && <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">{label}</label>}
      <input
        {...props}
        className="w-full px-5 py-3 rounded-xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-semibold text-sm"
      />
    </div>
  )

  const CustomTextArea = ({ label, ...props }) => (
    <div className="space-y-1.5 flex-1 w-full">
      {label && <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">{label}</label>}
      <textarea
        {...props}
        className="w-full px-5 py-3 rounded-xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-semibold text-sm min-h-[80px]"
      />
    </div>
  )

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-3xl glass-dark border border-white/10 rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-carbon-dark/50 backdrop-blur-xl shrink-0">
              <div>
                <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Initialize Risk Matrix</h2>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Tiered Quiz Serialization</p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Content Swiper */}
            <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
              {/* Arena Name */}
              <div className="p-8 glass bg-primary/5 rounded-[2rem] border border-primary/20 space-y-4">
                <div className="flex items-center gap-3">
                  <RiFocus2Line className="text-primary text-xl" />
                  <h3 className="text-sm font-black italic text-white uppercase tracking-tighter">Arena Designation</h3>
                </div>
                <CustomInput
                  placeholder="Enter challenge group name (e.g. European Legends 2024)..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Quiz Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tiers.map(({ label, state, setState, icon, color }) => (
                  <div key={label} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] border border-white/10 group-hover:border-primary/30 transition-all duration-500`} />
                    <div className="relative p-8 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl ${color}`}>
                            {icon}
                          </div>
                          <span className="text-lg font-black italic text-white uppercase tracking-tighter">{label}</span>
                        </div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Protocol {label.charAt(0)}</div>
                      </div>

                      <div className="space-y-4">
                        <CustomTextArea
                          label="Question Parameters"
                          placeholder={`Input ${label} level query...`}
                          value={state.question}
                          onChange={(e) => setState({ ...state, question: e.target.value })}
                        />
                        <CustomInput
                          label="Verification Key"
                          placeholder="Expected response..."
                          value={state.answer}
                          onChange={(e) => setState({ ...state, answer: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-carbon-dark/80 backdrop-blur-xl border-t border-white/5 shrink-0">
              <button
                onClick={(e) => addRisk(e, name, easy, medium, hard, expert)}
                className="w-full h-18 bg-primary hover:bg-primary-hover text-white font-black text-sm uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3"
              >
                <RiAddLine size={24} /> Register Arena Data
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddRisk;
