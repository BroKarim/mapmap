import { LatLngExpression } from 'leaflet'
import { Category } from './MarkerCategories'
import { useEffect } from 'react'
import { zinc } from 'tailwindcss/colors'

export interface PlaceValues {
  id: number
  no: number,
  opd: string ,
  keterangan: string | null,
  position: LatLngExpression
  category: Category
  title: string
  address: string
}

export interface LineValues {
  id: number
  no: number,
  opd: string ,
  keterangan: string
  position: LatLngExpression
  category: Category
  title: string
  address: string
}


export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

export const getPlaces = async (): Promise<PlacesType> => {
  const response = await fetch(`${process.env.API_URL}/places`)
  const data = await response.json()

  const pointData : any = data.titik;
  const lineData : any  = data.garis;

  const allData: any = [...pointData, ...lineData]

  const fixedData: PlacesType = allData.map((item: any) => {
    const koordinate = item.koordinate[0]
    return {
      id: item.id,
      no: item.no,
      title: item.nama,
      address: `${item.kampong}, ${item.kecamatan}`,
      opd: item.opd,
      category: item.tipe,
      position: koordinate,
      keterangan: item.keterangan,
    }
  })

  // console.log("fixed Data:", fixedData);
  return fixedData
}

// export const Places: PlacesType = getPlaces();

// 5.574166911512272, 95.351421949159
