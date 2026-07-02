import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface DuplicateBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const DuplicateBlockModal: React.FC<DuplicateBlockModalProps> = ({
  isOpen,
  onClose,
  message = "This property is already listed."
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white border border-red-100 p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4"
              >
                <AlertTriangle size={36} className="animate-pulse" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Duplicate Listing Detected
              </h3>
              
              <p className="mt-3 text-sm text-gray-500 leading-relaxed px-2">
                {message}
              </p>

              <button
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue to-blue px-4 py-3 text-sm font-semibold text-white shadow-md active:scale-[0.98] transition-all"
              >
                Understood, Go Back
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};