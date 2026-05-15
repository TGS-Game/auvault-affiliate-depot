import { useRole } from '../context/RoleContext'
import { ALL_PARTNERS, usePartnerView } from '../context/PartnerViewContext'
import { PARTNERS } from '../pages/Staff/staffData'
import Card from './Card'
import staffStyles from '../pages/Staff/Staff.module.css'

export default function PartnerSelector() {
  const { isStaff } = useRole()
  const { selectedPartnerId, setSelectedPartnerId } = usePartnerView()

  if (!isStaff) return null

  return (
    <Card noTitle title="">
      <div className={staffStyles.partnerSelector}>
        <span className={staffStyles.partnerSelectorLabel}>
          Viewing data for
        </span>
        <select
          className={staffStyles.partnerSelect}
          value={selectedPartnerId}
          onChange={(e) => setSelectedPartnerId(e.target.value)}
        >
          <option value={ALL_PARTNERS}>All Partners</option>
          {PARTNERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id})
            </option>
          ))}
        </select>
      </div>
    </Card>
  )
}
