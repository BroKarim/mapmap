'use client'

import { Check, Clock, MapPin, Search } from 'lucide-react'
import * as React from 'react'

import { Input } from '#components/ui/input'
import { getPlaces, PlacesType } from '#lib/Places'
import { cn } from '#lib/utils'

import useMapContext from '../useMapContext'

interface Location {
  id: string
  name: string
  address: string
  type: 'recent' | 'place' | 'atm'
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Asrama PHB Lampriet',
    address: 'Jalan Nirbaya II, Bandar...',
    type: 'recent',
  },
  {
    id: '2',
    name: 'Aula Kantor BPSDM Aceh',
    address: 'Jalan T. Panglima N...',
    type: 'place',
  },
  {
    id: '3',
    name: 'Ayam Geprek Paparons Lamgugob',
    address: 'Jalan T. La...',
    type: 'place',
  },
  {
    id: '4',
    name: 'Adidas',
    address: 'Lihat lokasi',
    type: 'place',
  },
  {
    id: '5',
    name: 'ATM',
    address: '',
    type: 'atm',
  },
]

export function SearchButton() {
  const { map } = useMapContext()
  const [searchText, setSearchText] = React.useState('')
  const [places, setPlaces] = React.useState<PlacesType>([])

  React.useEffect(() => {
    const fetchPlaces = async () => {
      const data = await getPlaces()
      setPlaces(data)
    }
    fetchPlaces()
  }, [])

  const filteredPlaces = places.filter(place => place.title.toLowerCase().includes(searchText.toLowerCase()))

  const handleSelectPlace = (place: any) => {
    setSearchText('')
    if (map) {
      map.flyTo(place.position, 15) // Geser peta ke lokasi
    }
  }

  return (
    <>
      <Input
        placeholder="Search Google Maps"
        style={{ zIndex: 400 }}
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value)
        }}
        className="text-black bg-white absolute top-10 left-3 h-10 w-64 justify-between"
      />
      {searchText && (
        <div
          style={{ zIndex: 400 }}
          className="rounded absolute top-28 left-3 z-50 w-96 border bg-[#fff] shadow-md"
        >
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <div
                key={place.id}
                onClick={() => handleSelectPlace(place)}
                className="hover:bg-gray-100 flex cursor-pointer items-center gap-3 p-3"
              >
                <MapPin className="h-4 w-4 shrink-0 opacity-50" />
                <div className="flex flex-col">
                  <span>{place.title}</span>
                  <span className="text-gray-500 text-sm">{place.address}</span>
                </div>
                <Check className="ml-auto h-4 w-4 opacity-100" />
              </div>
            ))
          ) : (
            <div className="text-gray-500 p-3">No results found.</div>
          )}
        </div>
      )}
    </>
  )
}
