import { useEffect, useState } from 'react'
import { useUpgradeModal } from '../../hooks'
import { UpgradeModal } from '../../components'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)
  const upgradeModal = useUpgradeModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  console.log(upgradeModal.email)
  return (
    <>
      <UpgradeModal 
        isOpen={upgradeModal.isOpen}
        onClose={upgradeModal.onClose}
        email={upgradeModal.email || ''}
      />
    </>
  )
}
