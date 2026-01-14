"use client";

import { Alert } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import {
  PartyPopper,
  Info,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import { useEffect } from "react";

type AlertType = "success" | "info" | "warning" | "celebrate";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: AlertType;
  duration?: number;
}

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  celebrate: PartyPopper,
};

export default function AppAlert({
  open,
  onClose,
  title,
  message,
  type = "success",
  duration = 4000,
}: Props) {
  const Icon = iconMap[type];

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
        >
          <Alert
            className="
              relative flex items-center gap-4 rounded-xl p-5
              bg-black border border-yellow-500/40
              shadow-[0_0_40px_rgba(250,204,21,0.25)]
            "
          >
            {/* Icon */}
            <div className="flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_15px_rgba(250,204,21,0.7)]">
              <Icon className="h-6 w-6 text-black" />
            </div>

            {/* Text (full width) */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-yellow-400 text-lg">{title}</h3>
              <p className="text-sm text-yellow-200 mt-1">{message}</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 p-1 rounded hover:bg-yellow-500/20"
            >
              <X className="h-5 w-5 text-yellow-400 hover:text-yellow-300" />
            </button>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
