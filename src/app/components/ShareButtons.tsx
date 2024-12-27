"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { trackEvent } from "../lib/utils";

interface ShareButtonsProps {
  sender: string;
  url: string;
  onClose: () => void;
}

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.216 175.552"
    className="w-6 h-6"
  >
    <defs>
      <linearGradient
        id="b"
        x1="85.915"
        x2="86.535"
        y1="32.567"
        y2="137.092"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#57d163" />
        <stop offset="1" stopColor="#23b33a" />
      </linearGradient>
    </defs>
    <path
      fill="url(#b)"
      d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
    />
  </svg>
);

const ShareButtons: React.FC<ShareButtonsProps> = ({
  sender,
  url,
  onClose,
}) => {
  const handleWhatsAppShare = () => {
    trackEvent("Share Click", {
      platform: "whatsapp",
      sender: sender,
      url: url,
    });
  };

  const handleFacebookShare = () => {
    trackEvent("Share Click", {
      platform: "facebook",
      sender: sender,
      url: url,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `¡Sorpresa! 🎉✨ *${sender}* te ha enviado un mensaje especial de Año Nuevo 2025. 🎊🥳 Descúbrelo aquí: ${url}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-pink-500 to-pink-600 p-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-md mx-auto space-y-3">
        <motion.a
          href={whatsappUrl}
          onClick={handleWhatsAppShare}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg font-medium transition-colors hover:bg-[#22c55e]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <WhatsAppIcon />
          Compartir en WhatsApp
        </motion.a>
        <motion.a
          href={facebookUrl}
          onClick={handleFacebookShare}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#1877F2] text-white rounded-lg font-medium transition-colors hover:bg-[#1664d4]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
          Compartir en Facebook
        </motion.a>
        <motion.button
          onClick={onClose}
          className="w-full text-white text-sm opacity-70 hover:opacity-100 transition-opacity py-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cerrar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShareButtons;
