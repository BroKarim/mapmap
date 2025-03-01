import L from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo } from 'react';
import { FeatureGroup, MapContainer, Polyline, Marker as ReactMarker, TileLayer } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import MarkerCategories from '#lib/MarkerCategories';
import { PlaceValues } from '#lib/Places';



import LeafletDivIcon from '../LeafletDivIcon';
import useMapContext from '../useMapContext';
import MarkerIconWrapper from './MarkerIconWrapper';


const LeafletPopup = dynamic(() => import('../LeafletPopup'))

export interface CustomMarkerProps {
  place: PlaceValues
}

// ini function marker
// This component displays individual markers on the map with custom icons and interactive popups.

export const CustomMarker = ({ place }: CustomMarkerProps) => {
  const { map } = useMapContext()
  const markerCategory = useMemo(() => MarkerCategories[place.category], [place.category])

  const handlePopupClose = useCallback(() => {
    if (!map) return
    map?.closePopup()
  }, [map])

  const handleMarkerClick = useCallback(() => {
    if (!map) return
    const clampZoom = map.getZoom() < 14 ? 14 : undefined
    const position = place.position || [0, 0] // Default ke [0, 0] jika position tidak ada
    map.setView(position, clampZoom)
  }, [map, place.position])

  // some event for the inner popup cta
  const handleOpenLocation = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('open location')
  }, [])

  return (
    <>
      <ReactMarker
        position={place.position || [0, 0]}
        icon={LeafletDivIcon({
          source: <MarkerIconWrapper color={markerCategory.color} icon={markerCategory.icon} />,
          anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
        })}
        eventHandlers={{ click: handleMarkerClick }}
        autoPan={false}
        autoPanOnFocus={false}
      >
        <LeafletPopup
          autoPan={false}
          autoClose
          closeButton={false}
          item={place}
          color={markerCategory.color}
          icon={markerCategory.icon}
          handleOpenLocation={handleOpenLocation}
          handlePopupClose={handlePopupClose}
        />
      </ReactMarker>
    </>
  )
}

/*

<ReactMarker
      position={place.position}
      icon={LeafletDivIcon({
        source: <MarkerIconWrapper color={markerCategory.color} icon={markerCategory.icon} />,
        anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
      autoPan={false}
      autoPanOnFocus={false}
    >
      <LeafletPopup
        autoPan={false}
        autoClose
        closeButton={false}
        item={place}
        color={markerCategory.color}
        icon={markerCategory.icon}
        handleOpenLocation={handleOpenLocation}
        handlePopupClose={handlePopupClose}
      />
    </ReactMarker>
*/