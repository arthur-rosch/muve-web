import ReactModal from 'react-modal'
import type { FC, ReactNode } from 'react'

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
          className={`bg-[#1D1D1D] rounded-lg flex flex-col items-center border-[1px] border-solid border-[#333333] ${styles}`}
        >
          {children}
        </div>
      </ReactModal>
    </>
  )
}
