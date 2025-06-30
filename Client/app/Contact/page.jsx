import React from 'react'
import { FaWhatsapp, FaPhoneAlt, FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact = () => {
  const ways = [
    {
      id: 1,
      icon: <FaPhoneAlt className="text-3xl text-green-600" />,
      title: '+20 155 066 2103'
    },
    {
      id: 2,
      icon: <MdEmail className="text-3xl text-green-600" />,
      title: 'ahmedking10710@gmail.com'
    },
  ];

  const social = [
    {
      icon: <FaFacebook className="text-white text-2xl" />,
      bg: 'bg-blue-600'
    },
    {
      icon: <FaInstagramSquare className="text-white text-2xl" />,
      bg: 'bg-pink-600'
    },
    {
      icon: <FaTwitter className="text-white text-2xl" />,
      bg: 'bg-blue-400'
    },
    {
      icon: <FaWhatsapp className="text-white text-2xl" />,
      bg: 'bg-green-500'
    },
  ];

  return (
    <div className="w-full py-20 px-4 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 tracking-wider uppercase">Contact Us</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 max-w-xl mx-auto">Feel free to reach out to us through any of the following channels. We’d love to hear from you!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 max-w-4xl mx-auto">
        {ways.map((way) => (
          <div key={way.id} className="flex flex-col items-center bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition hover:shadow-xl">
            <div className="mb-4">{way.icon}</div>
            <span className="text-sm text-gray-800 dark:text-white tracking-wide">{way.title}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-yellow-600 mt-16 mb-4 tracking-widest">Follow Us</h3>
      <div className="flex justify-center gap-5 flex-wrap">
        {social.map((item, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:scale-110 transform transition ${item.bg}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
