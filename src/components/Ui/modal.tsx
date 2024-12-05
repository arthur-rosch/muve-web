import { cn } from '../../utils';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <div className="fixed inset-0 z-50">
              <div className="min-h-screen flex items-center justify-center">
                <Dialog.Overlay asChild>
                  <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    transition={{ duration: 0.2 }}
                  />
                </Dialog.Overlay>

                <Dialog.Content asChild>
                  <motion.div
                    className={cn(
                      "relative w-full mx-auto rounded-2xl bg-secondary p-6 shadow-xl bg-[#121212]",
                      "focus:outline-none z-50",
                      "my-4 max-h-[calc(100vh-2rem)] overflow-y-auto",
                      "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent",
                      className
                    )}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {children}
                  </motion.div>
                </Dialog.Content>
              </div>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}