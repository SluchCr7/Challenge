'use client'
import React from 'react'
import { RiWhatsappLine, RiPhoneLine, RiFacebookCircleLine, RiInstagramLine, RiTwitterXLine, RiMailLine, RiCustomerService2Line, RiMapPinUserLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const Contact = () => {
  const ways = [
    {
      id: 1,
      icon: <RiPhoneLine />,
      label: 'Direct Line',
      title: '+20 155 066 2103',
      desc: 'Available 24/7 for critical arena support'
    },
    {
      id: 2,
      icon: <RiMailLine />,
      label: 'Digital Address',
      title: 'support@arena.com',
      desc: 'Official communication channel for business'
    },
  ];

  const social = [
    { icon: <RiFacebookCircleLine />, color: 'blue', link: '#' },
    { icon: <RiInstagramLine />, color: 'primary', link: '#' },
    { icon: <RiTwitterXLine />, color: 'white', link: '#' },
    { icon: <RiWhatsappLine />, color: 'green', link: '#' },
  ];

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-20 px-6 relative overflow-hidden'>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-20 right-20 opacity-[0.02] text-[250px] font-black italic select-none pointer-events-none -rotate-12 uppercase">CONTACT</div>

      <div className='w-full max-w-6xl space-y-20 relative z-10'>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-2xl border border-primary/20"
          >
            <RiCustomerService2Line />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">
              Global <span className="text-primary">Support</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-xs max-w-lg mx-auto leading-relaxed">
              Connect with the operations team. We are standing by to assist with your arena experience.
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ways.map((way, i) => (
            <motion.div
              key={way.id}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-dark border border-white/10 rounded-[3.5rem] p-12 space-y-6 group transition-all duration-500 hover:border-primary/50 relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-9xl text-white/[0.02] font-black italic select-none -rotate-12 group-hover:text-primary/[0.05] transition-all uppercase">HUB</div>

              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-3xl text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                {way.icon}
              </div>

              <div className="space-y-2 relative z-10 text-center md:text-left">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{way.label}</span>
                <h3 className="text-2xl md:text-3xl font-black italic text-white tracking-tighter uppercase group-hover:text-primary transition-colors">{way.title}</h3>
                <p className="text-white/30 font-bold uppercase tracking-widest text-[9px] pt-2">{way.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Sector */}
        <div className="glass border border-white/5 rounded-[4.5rem] p-16 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
          <div className="space-y-4">
            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">Broadcast Channels</h3>
            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-[10px]">Follow us for live updates and event announcements</p>
          </div>

          <div className="flex justify-center flex-wrap gap-8">
            {social.map((item, index) => (
              <motion.a
                href={item.link}
                key={index}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 flex items-center justify-center rounded-[1.5rem] glass border border-white/10 text-2xl transition-all shadow-2xl hover:border-primary shadow-primary/5 hover:bg-primary/10`}
              >
                <span className={`text-white transition-colors`}>{item.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Integrity */}
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-20 filter grayscale">
          <div className="flex items-center gap-3">
            <RiMapPinUserLine className="text-xl" />
            <span className="text-[10px] font-black uppercase tracking-widest">Global HQ - Cairo, EG</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-widest">Server Status: Optimal</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
