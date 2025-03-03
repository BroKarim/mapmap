import { MapOptions } from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import useMapContext from './useMapContext'

interface LeafletMapContainerProps extends MapOptions {
  children: JSX.Element | JSX.Element[]
}

// The main wrapper component renders a Leaflet map using React-Leaflet's MapContainer.
export const LeafletMapContainer = ({ children, ...props }: LeafletMapContainerProps) => {
  const { setMap, setLeafletLib } = useMapContext()

  useEffect(() => {
    if (!setLeafletLib) return
    import('leaflet').then(leaflet => {
      setLeafletLib(leaflet)
    })
  }, [setLeafletLib])

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      className="text-white absolute h-full  w-full outline-0"
      {...props}
    >
      {/* <TileLayer
        attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  )
}
