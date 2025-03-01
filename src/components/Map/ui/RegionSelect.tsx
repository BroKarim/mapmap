//debug dulu, kok bis ak etrigger reload
// tapi sudah dipastikan bawha di map/index, page/map/index dan map/_app.tsx tdak ada pen-trigger
'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { Button } from '#components/ui/button'
import Dropdown, { MenuItem } from '#components/ui/dropdown-medium'
import { getPlaces, PlacesType } from '#lib/Places'

import useMapContext from '../useMapContext'

export function OpdSelect({ setFilteredMarkers }: { setFilteredMarkers: (places: PlacesType) => void }) {
  const [opdList, setOpdList] = React.useState<string[]>([])
  const [selectedOpd, setSelectedOpd] = React.useState<string | null>(null)
  const [places, setPlaces] = React.useState<PlacesType>([])
  const { map } = useMapContext()

  React.useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getPlaces()
      setPlaces(data)
      setFilteredMarkers(data) // Tampilkan semua marker saat pertama kali load
      const uniqueOpds = Array.from(new Set(data.map(place => place.opd)))
      setOpdList(uniqueOpds)
    }
    fetchPlaces()
  }, [setFilteredMarkers])

  const handleSelectOpd = (opd: string) => {
    setSelectedOpd(opd)
    const filtered = places.filter(place => place.opd === opd)
    setFilteredMarkers(filtered)
    if (filtered.length > 0 && map) {
      map.flyTo(filtered[0].position, 14)
    }
  }
  // Menentukan teks yang akan ditampilkan pada dropdown
  const dropdownTitle = selectedOpd || 'Select OPD'
  return (
    <>
      <div style={{ zIndex: 400 }} className="absolute top-10 left-72 w-full flex gap-2">
        <Dropdown
          item={{
            title: dropdownTitle,
            children: opdList.map(opd => ({
              title: opd,
              onClick: () => handleSelectOpd(opd),
            })),
          }}
        />
        {selectedOpd && (
          <Button
            
            onClick={() => {
              setFilteredMarkers(places)
              setSelectedOpd(null)
            }}
          >
            Reset
          </Button>
        )}
      </div>
    </>
  )
}
