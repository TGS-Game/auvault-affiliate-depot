import { BookIcon } from '../../components/icons'
import ComingSoonPage from './ComingSoonPage'

export default function ResourcesPlaceholder() {
  return (
    <ComingSoonPage
      title="Resources"
      icon={<BookIcon size={32} />}
      description="Tariff information, legal documentation, inheritance process, and account transfer guides."
    />
  )
}
