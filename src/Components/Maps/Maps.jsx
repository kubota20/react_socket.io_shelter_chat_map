import React, { useState, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
// Styles
import { MapCanvasElement, Cluster } from './styles'
// Data
import { shelterData, LocationMarker, LocationInfoBox } from '../index'

const Maps = ({ coords }) => {
  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [locationInfo, setLocationInfo] = useState(null)

  const eventDataIndex = {
    5: '火事',
    10: '津波',
    15: '地震',
  }

  let eventDataIndexNum = Object.keys(eventDataIndex).map((index) =>
    Number(index),
  )

  const { clusters, supercluster } = useSupercluster({
    points: shelterData,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  })

  return (
    <MapCanvasElement>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        center={coords}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom)
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ])
        }}
        onClick={() => {
          setLocationInfo(null)
        }}
        onDrag={() => {
          setLocationInfo(null)
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {
            cluster: isCluster,
            point_count: pointCouunt,
          } = cluster.properties
          const clusterID = cluster.properties.typeID
          if (isCluster) {
            // クラスターの中にカウントを入れ、サイズなど変更します
            let changeSize = Math.round((pointCouunt / shelterData.length) * 50)
            let addSize = Math.min(changeSize * 10, 20)
            return (
              <Cluster
                key={cluster.id}
                lat={latitude}
                lng={longitude}
                style={{
                  width: addSize + changeSize + 'px',
                  height: addSize + changeSize + 'px',
                }}
                onClick={() => {
                  // クラスタークリックしたらズームする
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20,
                  )
                  mapRef.current.setZoom(expansionZoom)
                  mapRef.current.panTo({ lat: latitude, lng: longitude })
                }}
              >
                {pointCouunt}
              </Cluster>
            )
          }

          if (
            eventDataIndexNum.indexOf(clusterID) !== -1 &&
            cluster.geometry.coordinates.length === 2
          ) {
            return (
              <LocationMarker
                key={cluster.id}
                typeID={clusterID}
                lat={latitude}
                lng={longitude}
                onClick={() => {
                  setLocationInfo({
                    // LocationInfoBoxにshelterDataを渡していますs
                    shelter: cluster.evacuationArea.shelter,
                    address: cluster.evacuationArea.address,
                  })
                }}
              />
            )
          }
        })}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </MapCanvasElement>
  )
}

export default Maps
