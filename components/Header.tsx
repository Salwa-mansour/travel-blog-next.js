import { getSiteSettings } from '@/actions/actions'
import HeaderNav from './HeaderNav'

export default async function Header() {
  const siteData = await getSiteSettings()

  return <HeaderNav siteData={siteData} />
}