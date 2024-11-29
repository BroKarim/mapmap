'use client'

import { Check, Clock, MapPin, Search } from 'lucide-react'
import * as React from 'react'

import { Input } from '#components/ui/input'
import { Places } from '#lib/Places'
import { cn } from '#lib/utils'

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
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [searchText, setSearchText] = React.useState('')

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchText.toLowerCase()),
  )
  return (
    <>
      <Input
        placeholder="Search Google Maps"
        style={{ zIndex: 400 }}
        value={searchText}
        onChange={event => {
          setSearchText(event.target.value)
        }}
        className="text-black absolute top-10 left-3 h-10 w-64 justify-between bg-white"
      />
      {searchText && (
        <div
          style={{ zIndex: 400 }}
          className="absolute top-28 left-3 z-50 w-96 rounded border bg-[#fff] shadow-md"
        >
          {filteredLocations.length > 0 ? (
            filteredLocations.map(location => (
              <div
                key={location.id}
                onClick={() => {
                  setValue(location.name) // Set the input value to the selected location's name
                  setSearchText('') // Clear the search text
                }}
                className="hover:bg-gray-100 flex cursor-pointer items-center gap-3 p-3"
              >
                {location.type === 'recent' && <Clock className="h-4 w-4 shrink-0 opacity-50" />}
                {location.type === 'place' && <MapPin className="h-4 w-4 shrink-0 opacity-50" />}
                {location.type === 'atm' && <Search className="h-4 w-4 shrink-0 opacity-50" />}
                <div className="flex flex-col">
                  <span>{location.name}</span>
                  {location.address && <span className="text-gray-500 text-sm">{location.address}</span>}
                </div>
                <Check
                  className={cn('ml-auto h-4 w-4', value === location.name ? 'opacity-100' : 'opacity-0')}
                />
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
