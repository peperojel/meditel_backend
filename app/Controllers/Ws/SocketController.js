'use strict'

const SocketConnection = use('App/Models/SocketConnection')

class SocketController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    this.sc = new SocketConnection()
    this.storeConnection(this.sc)
  }

  async storeConnection (sc) {
    sc.topic = this.socket.topic
    sc.socket_id = this.socket.id
    sc.role = this.auth.user.role
    sc.is_ready = false
    await sc.save()
  }

  onMessage (message) {
    const {type, data} = message

    switch (type) {
      case 'asesoria:request':
        this.socket.broadcast('message', {
          type: 'asesoria:request',
          data: {
            nombre: this.auth.use.nombre,
            apellido: this.auth.user.apellido
          }
        });
        break;
      case 'asesoria:start':
        this.socket.broadcastToAll('message', {
          type: 'asesoria:start',
          data: ''
        });
        break;
      case 'asesoria:ready':
        this.sc.is_ready = true;
        await this.sc.save();
        const part = await SocketConnection
          .query()
          .where({
            topic: this.topic,
            is_ready: true
          })
          .fetch()
          // Contar elementos de part
    }


  }
}

module.exports = SocketController
