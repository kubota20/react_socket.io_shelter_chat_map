import styled from 'styled-components'

export const MapCanvasElement = styled.div`
  position: relative;
  width: 100vw;
  height: 400px;
`

export const Cluster = styled.div`
  color: white;
  background: #303f9f;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LocationInfo = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  width: 200px;
  min-height: 100px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  font-size: 15px;
  color: white;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 5px;
  }
`
