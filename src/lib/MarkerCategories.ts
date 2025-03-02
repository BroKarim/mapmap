import { Leaf, LocateFixed, LucideProps, PersonStanding, MapPin } from 'lucide-react';
import { FunctionComponent } from 'react';
import colors from 'tailwindcss/colors';





export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
  ROAD = 3,
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
  [Category.CAT1]: {
    name: 'titik',
    icon: MapPin,
    color: colors.blue[400],
  },
  [Category.CAT2]: {
    name: 'Garis',
    icon: MapPin,
    color: colors.red[400],
  },
  [Category.ROAD]: {
    name: 'Road',
    icon: MapPin, // Ikon khusus untuk jalan
    color: colors.orange[400],
    hideInMenu: true, // Opsional: Sembunyikan dari menu jika tidak diperlukan
  },
}

export default MarkerCategories
