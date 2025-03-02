import { LucideProps } from 'lucide-react'
import { FunctionComponent, useMemo } from 'react'

import { AppConfig } from '#lib/AppConfig'

export interface MarkerIconWrapperProps {
  icon?: FunctionComponent<LucideProps>
  color: string
  label?: string
}

const MarkerIconWrapper = ({ icon, color, label }: MarkerIconWrapperProps) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <div className="relative inline-flex p-0 rounded-full">
      {label && (
        <span className="absolute -inset-2 rounded-full opacity-40" style={{ backgroundColor: color }} />
      )}
      <div
        className="relative inline-block rounded-full bg-primary p-2 text-white overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {IconFC && <IconFC size={AppConfig.ui.markerIconSize} />}
        {label && (
          <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-error text-xs">
            {label}
          </span>
        )}
      </div>
      <span className={`absolute ${label ? '-inset-2' : '-inset-1'} rounded-full shadow-md`} />
    </div>
  )
}

export default MarkerIconWrapper
