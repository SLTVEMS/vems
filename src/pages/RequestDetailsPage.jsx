import { useState } from 'react'
import RequestDetailsModal from '../components/requestDetails/RequestDetailsModal'
import RejectConfirmationModal from '../components/requestDetails/RejectConfirmationModal'

function RequestDetailsPage() {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const handleConfirmReject = () => {
    console.log('Reject request confirmed')
    setIsRejectModalOpen(false)
  }

  return (
    <>
      <RequestDetailsModal onRejectClick={() => setIsRejectModalOpen(true)} />
      <RejectConfirmationModal
        open={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
      />
    </>
  )
}

export default RequestDetailsPage
