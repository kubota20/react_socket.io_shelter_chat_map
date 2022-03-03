import React, { useState, useEffect, useRef } from 'react'
import { Chats, Maps, Heaber, Operation } from './Components/index'

import './App.css'

const App = () => {
  const [coords, setCoords] = useState({ lat: 35.68944, lng: 139.69167 })

  const [entered, setEntered] = useState(false)
  const [name, setName] = useState('')
  const mapRef = useRef()

  // 現在地を聞きます
  // 現在地が表示されない場合デフォルトでcoords座標が表示されます
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
      },
    )
  }, [])

  const handleEnter = (name) => {
    setEntered(true)
    setName(name)
  }

  const handleLeave = () => {
    setEntered(false)
  }

  return (
    <>
      <Heaber setCoords={setCoords} mapRef={mapRef} />
      <Maps coords={coords} />
      <div className="chatmes">
        <Operation
          onEnter={handleEnter}
          onLeave={handleLeave}
          entered={entered}
        />
        {entered && <Chats name={name} />}
      </div>
    </>
  )
}

export default App
