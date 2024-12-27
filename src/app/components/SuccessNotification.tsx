"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SuccessNotificationProps {
  show: boolean;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  show,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 z-50"
          onClick={onClose}
        >
          <CheckCircle size={24} />
          <span className="text-lg font-semibold">
            ¡Mensaje creado con éxito!
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessNotification;
