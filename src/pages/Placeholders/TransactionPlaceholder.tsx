import { ReceiptIcon } from '../../components/icons'
import ComingSoonPage from './ComingSoonPage'

export default function TransactionPlaceholder() {
  return (
    <ComingSoonPage
      title="Transaction"
      icon={<ReceiptIcon size={32} />}
      description="Full transaction history, filtering, export, and real-time status tracking."
    />
  )
}
