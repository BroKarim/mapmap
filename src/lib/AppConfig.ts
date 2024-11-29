import { LatLngExpression } from 'leaflet'

// FIXME: naming and structure
export const AppConfig = {
  minZoom: 9,
  maxZoom: 18, // max zoom level of CARTO: 18
  initialZoom: 8,
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  // baseCenter: [52.02022592597971, 8.530780645829076] as LatLngExpression,
  baseCenter: [5.5536228, 95.3441523] as LatLngExpression,
  // baseCenter: [95.3441523, 5.5536228] as LatLngExpression,
}

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}
