import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

export const Places: PlacesType = [
  {
    id: 1,
    position: [5.574799287440622, 95.35188406977655],
    category: Category.CAT2,
    title: 'Ar',
    address: 'Another Adress 252627, Test City',
  },
]

// 5.571069994409479, 95.35653808052965

// 5.574799287440622, 95.35188406977655
