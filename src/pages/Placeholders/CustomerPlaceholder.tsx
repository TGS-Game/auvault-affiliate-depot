import { UsersIcon } from '../../components/icons'
import ComingSoonPage from './ComingSoonPage'

export default function CustomerPlaceholder() {
  return (
    <ComingSoonPage
      title="Customer"
      icon={<UsersIcon size={32} />}
      description="Customer management, search, validation status, full transaction history and email threads."
    />
  )
}
