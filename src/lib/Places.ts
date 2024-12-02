import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

export interface PlaceValues {
  id: number
  position?: LatLngExpression
  startPosition?: LatLngExpression
  endPosition?: LatLngExpression
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
  {
    id: 2,
    position: [5.575410492853591, 95.35112586120677],
    category: Category.LOCATE,
    title: 'Tes ply 1',
    address: 'Another Adress 252627, Test City',
  },
  {
    id: 3,
    position: [5.574166911512272, 95.351421949159],
    category: Category.LOCATE,
    title: 'Test ply 2',
    address: 'Another Adress 252627, Test City',
  },

  {
    id: 4,
    category: Category.ROAD,
    title: 'Road Segment 1',
    address: 'Another Adress 252627, Test City',
    startPosition: [5.575410492853591, 95.35112586120677],
    endPosition: [5.574166911512272, 95.351421949159],
  },
  {
    id: 5,
    position: [5.574193037354596, 95.3507822974347],
    category: Category.LOCATE,
    title: 'Embassy Mini Soccer',
    address: 'Another Adress 252627, Test City',
  },
  {
    id: 6,
    position: [5.574167501382892, 95.3504557232505],
    category: Category.LOCATE,
    title: 'Universitas Kopi',
    address: 'Another Adress 252627, Test City',
  },
  {
    id: 7,
    position: [5.573986413172215, 95.34974003853071],
    category: Category.LOCATE,
    title: 'Gacoan',
    address: 'Another Adress 252627, Test City',
  },
]

// 5.574166911512272, 95.351421949159
