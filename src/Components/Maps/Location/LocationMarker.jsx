import React from 'react'
import LocationIcon from '@material-ui/icons/LocationOnOutlined'

const LocationMarker = ({ onClick, typeID }) => {
  let renderIcon = null

  if (typeID === 10) {
    renderIcon = LocationIcon
  }

  return (
    <div onClick={onClick}>
      <LocationIcon color="primary" fontSize="large" />
    </div>
  )
}

export default LocationMarker
