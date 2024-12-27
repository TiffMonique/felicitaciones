"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MessageFormProps {
  onSubmit: (name: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-pink-500 to-pink-600"
      >
        <p className="text-white text-sm sm:text-base mb-1 font-semibold">
          ¡Crea tu propio mensaje personalizado de Año Nuevo!
        </p>
        <div className="flex w-full max-w-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="👋 Escribe tu nombre aquí.."
            className="flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-l-full bg-white bg-opacity-20 text-white placeholder-pink-200 border-2 border-pink-400 focus:outline-none focus:border-pink-300 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-4 py-2 sm:px-8 sm:py-3 rounded-r-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Crear
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MessageForm;
