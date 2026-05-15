import { useRole } from '../../context/RoleContext'
import PartnerHome from './PartnerHome'
import StaffHome from './StaffHome'

export default function Home() {
  const { isStaff } = useRole()
  return isStaff ? <StaffHome /> : <PartnerHome />
}
