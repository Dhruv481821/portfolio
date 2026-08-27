import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { startLenis, stopLenis } from "@/lib/lenis";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}

export function Modal({ isOpen, onClose, children, labelledBy }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Freeze Lenis too. Setting body overflow alone doesn't stop its rAF loop,
    // so it keeps easing toward a stale target behind the dialog.
    stopLenis();
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      startLenis();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            /**
             * Required. While Lenis is stopped it calls `preventDefault()` on
             * wheel/touch events window-wide, which would also kill this panel's
             * own `overflow-y-auto`. `data-lenis-prevent` tells Lenis to ignore
             * events originating inside here.
             */
            data-lenis-prevent
            className="glass-blur relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-10"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-5 top-5 rounded-full p-2 text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)] transition-colors"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
