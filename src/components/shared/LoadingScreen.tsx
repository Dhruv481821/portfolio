import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-[var(--font-display)] text-2xl font-semibold tracking-tight"
          >
            <span className="gradient-text">DS</span>
          </motion.div>
          <div className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-[var(--color-border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-electric)] via-[var(--color-purple)] to-[var(--color-cyan)]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
