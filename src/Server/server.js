const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
  // ユーザーが接続した時の処理
  console.log('A client connected.')
  socket.on('send', (payload) => {
    console.log(payload)
    socket.broadcast.emit('broadcast', payload)
  })
  socket.on('disconnect', () => {
    console.log('Conenction closed.')
  })
})

http.listen(PORT, () => {
  console.log(`サーバー${PORT}接続、http://localhost:${PORT}`)
})
