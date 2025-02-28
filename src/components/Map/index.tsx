import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import MapTopBar from '#components/TopBar'
import { AppConfig } from '#lib/AppConfig'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import { getPlaces, PlacesType } from '#lib/Places'

import LeafleftMapContextProvider from './LeafletMapContextProvider'
import { RegionSelect } from './ui/RegionSelect'
import { SearchButton } from './ui/SearchButton'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'

// for client-side components or modules that need browser-specific objects like window or document
// setting ssr: false helps avoid SSR-related errors.
const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
  ssr: false,
})
// const RegionSelect = dynamic(async () => (await import('./ui/RegionSelect')).RegionSelect, {
//   ssr: false,
// })
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./LeafletMarker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
  ssr: false,
})


const LeafletMapInner = () => {
  const [Places, setPlaces] = useState<any>();
  useEffect(()=>{
    const fetchData = async() => {
      const data = await getPlaces();
      setPlaces(data);
    }

    fetchData();
  },[])
  const { map } = useMapContext()
  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight,
  })
  console.log('LeafletMapInner context:', map)
  const isLoading = !map || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  console.log('map', map);
  useEffect(() => {
    console.log('map :', map);
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.off('moveend', moveEnd)
    }

    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter, map])

  return (
    <>
      <div className="bg-[#000] absolute  h-full w-full " ref={viewportRef}>
        {/* map header */}
        {/* <MapTopBar /> */}
        {/* map main */}
        <div
          className={` absolute h-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
          style={{
            top: AppConfig.ui.topBarHeight,
            width: viewportWidth ?? '100%',
            height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
          }}
        >
          {allMarkersBoundCenter && clustersByCategory && (
            <LeafletMapContainer
              center={allMarkersBoundCenter.centerPos}
              zoom={allMarkersBoundCenter.minZoom}
              maxZoom={AppConfig.maxZoom}
              minZoom={AppConfig.minZoom}
            >
              {!isLoading ? (
                <>
                  {/* balik ke posisi awal  */}
                  <CenterToMarkerButton
                    center={allMarkersBoundCenter.centerPos}
                    zoom={allMarkersBoundCenter.minZoom}
                  />
                  {/* cari lokasi kita saaat ini  */}
                  <LocateButton />
                  <SearchButton />
                  <RegionSelect />
                  {/* icon/marker for place desc */}
                  {Object.values(clustersByCategory).map(item => (
                    <LeafletCluster
                      key={item.category}
                      icon={MarkerCategories[item.category as Category].icon}
                      color={MarkerCategories[item.category as Category].color}
                      chunkedLoading
                    >
                      {item.markers.map(marker => (
                        <CustomMarker place={marker} key={marker.id} />
                      ))}
                    </LeafletCluster>
                  ))}
                </>
              ) : (
                // we have to spawn at least one element to keep it happy
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              )}
            </LeafletMapContainer>
          )}
        </div>
      </div>
    </>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <LeafleftMapContextProvider>
    <LeafletMapInner />
  </LeafleftMapContextProvider>
)

export default Map
