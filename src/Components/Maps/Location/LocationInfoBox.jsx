import React from 'react'
import { LocationInfo } from '../styles'

const LocationInfoBox = ({ info }) => {
  return (
    <LocationInfo>
      <h2>避難場所</h2>
      <ul>
        <li>避難先 : {info.shelter}</li>
        <li>住所 : {info.address}</li>
      </ul>
    </LocationInfo>
  )
}

export default LocationInfoBox
