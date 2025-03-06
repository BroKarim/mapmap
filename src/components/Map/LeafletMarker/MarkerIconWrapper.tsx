import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'

import { AppConfig } from '#lib/AppConfig'
// bagin ini perlu diperbaiki agar klo yg berkumpul bs d nengok
export interface MarkerIconWrapperProps {
  icon?: FunctionComponent<LucideProps>
  color: string
  label?: string
}

const MarkerIconWrapper = ({ icon, color, label }: MarkerIconWrapperProps) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <div className="rounded-full p-0">
      {IconFC && <IconFC size={AppConfig.ui.markerIconSize} />}
    </div>
  )
}

export default MarkerIconWrapper
