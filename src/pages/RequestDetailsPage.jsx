import { useState } from 'react'
import RequestDetailsModal from '../components/requestDetails/RequestDetailsModal'
import RejectConfirmationModal from '../components/requestDetails/RejectConfirmationModal'

// Owns the reject confirmation modal state for the request details flow.
function RequestDetailsPage() {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const openRejectModal = () => {
    setIsRejectModalOpen(true)
  }

  const closeRejectModal = () => {
    setIsRejectModalOpen(false)
  }

  const handleConfirmReject = () => {
    console.log('Reject request confirmed')
    closeRejectModal()
  }

  return (
    <>
      <RequestDetailsModal onRejectClick={openRejectModal} />
      <RejectConfirmationModal
        open={isRejectModalOpen}
        onClose={closeRejectModal}
        onConfirm={handleConfirmReject}
      />
    </>
  )
}

export default RequestDetailsPage
