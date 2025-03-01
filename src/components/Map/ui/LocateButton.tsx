import { LatLngExpression } from 'leaflet'
import { LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'

import { CustomMarker } from '../LeafletMarker'
import useMapContext from '../useMapContext'

export const LocateButton = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)

  const handleClick = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
      })
    } else {
      setUserPosition(undefined)
    }
  }, [])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition)
    }
  }, [map, userPosition])

  return (
    <>
      <button
        type="button"
        style={{ zIndex: 400 }}
        className="button rounded bg-white text-dark absolute top-16 right-3 p-2 shadow-md"
        onClick={() => handleClick()}
      >
        <LocateFixed color="#ffff" size={AppConfig.ui.mapIconSize} />
      </button>
      {userPosition && (
        <CustomMarker
          place={{
            id: 0,
            no: 0,
            title: 'Your location',
            address: 'You are here',
            opd: 'N/A', // Tidak relevan, jadi beri nilai default
            category: Category.LOCATE,
            position: userPosition,
            keterangan: 'User current location',
            image: null,
          }}
        />
      )}
    </>
  )
}
