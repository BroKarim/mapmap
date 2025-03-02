import { LatLngExpression } from 'leaflet'
import { Category } from './MarkerCategories'
import { useEffect } from 'react'
import { zinc } from 'tailwindcss/colors'

export interface PlaceValues {
  id: number
  no: number,
  opd: string ,
  opdPelaksana: string,
  keterangan: string | null,
  position: LatLngExpression
  category: Category
  title: string
  address: string
  image: string | null;
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
  const response = await fetch('./api/places')
  const data = await response.json()

  const pointData : any = data.titik;
  const lineData : any  = data.garis;

  const allData: any = [...pointData, ...lineData]

  const fixedData: PlacesType = allData.map((item: any) => {

    return {
      id: item.id,
      no: item.no,
      title: item.nama,
      address: `${item.kampong}, ${item.kecamatan}`,
      opd: item.opd,
      opdPelaksana: item.opdPelaksana,
      category: item.tipe === 'titik' ? 1 : 2,
      position: item.koordinate,
      keterangan: item.keterangan,
      image: item.gambar,
    }
  })

  console.log("fixed Data:", fixedData);
  return fixedData
}

// export const Places: PlacesType = getPlaces();

// 5.574166911512272, 95.351421949159
