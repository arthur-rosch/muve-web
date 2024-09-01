import type { FC, ReactNode } from 'react'
import ReactModal from 'react-modal'

interface CustomModalProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
  styles?: string
}

export const CustomModalRoot: FC<CustomModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  styles,
}) => {
  return (
    <>
      <ReactModal
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: 'none',
          },
        }}
        isOpen={isOpen}
      >
        <div
          className={`bg-[#121212] rounded-3xl flex flex-col items-center ${styles}`}
        >
          {children}
        </div>
      </ReactModal>
    </>
  )
}
