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
    { label: 'سهل (Easy)', state: easy, setState: setEasy, icon: <RiFocus2Line />, color: 'text-emerald-400', badge: '5 نقاط' },
    { label: 'متوسط (Medium)', state: medium, setState: setMedium, icon: <RiFlashlightLine />, color: 'text-sky-400', badge: '10 نقاط' },
    { label: 'صعب (Hard)', state: hard, setState: setHard, icon: <RiFireLine />, color: 'text-amber-400', badge: '20 نقطة' },
    { label: 'خبير (Expert)', state: expert, setState: setExpert, icon: <RiTrophyLine />, color: 'text-primary', badge: '40 نقطة' }
  ];

  const CustomInput = ({ label, ...props }) => (
    <div className="space-y-1 w-full">
      {label && <label className="text-[11px] font-bold text-muted ml-1">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-all text-xs font-medium"
      />
    </div>
  );

  const CustomTextArea = ({ label, ...props }) => (
    <div className="space-y-1 w-full">
      {label && <label className="text-[11px] font-bold text-muted ml-1">{label}</label>}
      <textarea
        {...props}
        className="w-full px-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-all text-xs font-medium min-h-[75px]"
      />
    </div>
  );

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
            className="relative w-full max-w-3xl card-surface border border-border rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden rtl"
          >
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-surface shrink-0">
              <div>
                <h2 className="text-lg font-black text-foreground">إضافة فئة ريسك جديدة</h2>
                <p className="text-[10px] font-bold text-primary tracking-wider uppercase">Risk Arena Configuration</p>
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
              {/* Category Name */}
              <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
                <label className="text-xs font-bold text-foreground block">اسم الفئة أو الموضوع</label>
                <CustomInput
                  placeholder="مثال: ليفربول، كلاسيكو 2011، دوري أبطال 2014..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tiers.map(({ label, state, setState, icon, color, badge }) => (
                  <div key={label} className="p-4 rounded-xl card-surface border border-border space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-base ${color}`}>{icon}</span>
                        <span className="text-xs font-bold text-foreground">{label}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-elevated text-muted">
                        {badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <CustomTextArea
                        label="نص السؤال"
                        placeholder="اكتب السؤال..."
                        value={state.question}
                        onChange={(e) => setState({ ...state, question: e.target.value })}
                      />
                      <CustomInput
                        label="الإجابة الصحيحة"
                        placeholder="اكتب الإجابة..."
                        value={state.answer}
                        onChange={(e) => setState({ ...state, answer: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface border-t border-border shrink-0">
              <button
                onClick={(e) => addRisk(e, name, easy, medium, hard, expert)}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <RiAddLine size={18} />
                <span>حفظ ونشر فئة الريسك</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddRisk;
