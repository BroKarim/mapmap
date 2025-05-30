import {
  createElementObject,
  createPathComponent,
  extendContext,
  LeafletContextInterface,
} from '@react-leaflet/core'
import Leaflet, { LeafletMouseEventHandlerFn } from 'leaflet'

import 'leaflet.markercluster'

import { LucideProps } from 'lucide-react'
import React, { FunctionComponent } from 'react'

import { AppConfig } from '#lib/AppConfig'

import LeafletDivIcon from './LeafletDivIcon'
import MarkerIconWrapper from './LeafletMarker/MarkerIconWrapper'

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn
  onDblClick?: LeafletMouseEventHandlerFn
  onMouseDown?: LeafletMouseEventHandlerFn
  onMouseUp?: LeafletMouseEventHandlerFn
  onMouseOver?: LeafletMouseEventHandlerFn
  onMouseOut?: LeafletMouseEventHandlerFn
  onContextMenu?: LeafletMouseEventHandlerFn
}

type MarkerClusterControl = Leaflet.MarkerClusterGroupOptions & {
  children: React.ReactNode
  icon: FunctionComponent<LucideProps>
  color: string
} & ClusterEvents

// ini yg ngatur icon, klo di zoom out bakal jadi satu
// Used to cluster markers based on geographical proximity,
// combining markers in the same area into a single cluster to enhance map readability.
const CreateMarkerClusterGroup = (props: MarkerClusterControl, context: LeafletContextInterface) => {
  const markerClusterGroup = new Leaflet.MarkerClusterGroup({
    removeOutsideVisibleBounds: false,
    spiderLegPolylineOptions: {
      className: 'hidden',
    },
    // zoomToBoundsOnClick: false,
    iconCreateFunction: cluster =>
      LeafletDivIcon({
        source: (
          <MarkerIconWrapper color={props.color} icon={props.icon} label={`${cluster.getChildCount()}`} />
        ),
        anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
      }),
    ...props,
  })

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup }),
  )
}

export const LeafletCluster = () =>
  createPathComponent<Leaflet.MarkerClusterGroup, MarkerClusterControl>(CreateMarkerClusterGroup)
