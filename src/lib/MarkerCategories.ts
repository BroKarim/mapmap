import {  Leaf, LocateFixed, LucideProps, MapPin } from 'lucide-react'
import { FunctionComponent } from 'react';
import colors from 'tailwindcss/colors';





export enum Category {
  LOCATE = 'locate',
  MASJID = 'masjid',
  RUMAH = 'rumah',
  JALAN = 'jalan',
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
  hideInMenu?: boolean
}

type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: MapPin,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.JALAN]: {
    name: 'Jalan',
    icon: MapPin, // Ikon khusus untuk jalan
    color: colors.orange[400],
    hideInMenu: true, // Opsional: Sembunyikan dari menu jika tidak diperlukan
  },
  [Category.RUMAH]: {
    name: 'Rumah',
    icon: Leaf, // Ikon khusus untuk jalan
    color: colors.orange[400],
    hideInMenu: true, // Opsional: Sembunyikan dari menu jika tidak diperlukan
  },
  [Category.MASJID]: {
    name: 'Masjid',
    icon: Leaf, // Ikon khusus untuk jalan
    color: colors.orange[400],
    hideInMenu: true, // Opsional: Sembunyikan dari menu jika tidak diperlukan
  },
}

export default MarkerCategories