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

  onMessage (message) {
    const {type, data} = message

    switch (type) {
      case 'asesoria:request':
        //TODO: DEBE SER CAMBIADO A BROADCAST
        this.socket.broadcastToAll('message', {
          type: 'asesoria:request',
          data: {
            nombre: this.auth.user.nombre,
            apellido: this.auth.user.apellido
          }
        });
        break;
      case 'asesoria:start':
        this.socket.broadcastToAll('message', {
          type: 'asesoria:start',
          data: 'Wena'
        });
        break;
      case 'asesoria:ready':
        this.updateState(this.sc,this.socket.topic)
      break;
      case 'asesoria:signaling':
        this.socket.broadcast('message', {
          type: 'asesoria:signaling',
          data: data
        });
        break;
      default:
        console.log("Default case")
      break;
    }
  }

  onClose () {
    this.deleteConnection(this.sc)
  }

  // Métodos de uso interno
  async storeConnection (sc) {
    sc.topic = this.socket.topic
    sc.socket_id = this.socket.id
    sc.role = this.auth.user.role
    sc.is_ready = false
    await sc.save()
  }

  async updateState (sc, topic) {
    sc.is_ready = true
    await sc.save()
    const part = await SocketConnection
          .query()
          .where({
            topic: topic,
            is_ready: true})
          .fetch()
    console.log(part.toJSON().length)
    if(part.toJSON().length === 2) {
      this.sendReady();
    } else {
      this.sendInit();
    }
  }

  async deleteConnection (sc) {
    await sc.delete();
  }

  sendReady = () => {
    this.socket.broadcastToAll('message', {
      type: 'asesoria:ready',
      data: ''
    });
  }

  //TODO: Eliminar esta función de testing
  sendInit = () => {
    this.socket.emit('message', {
      type: 'asesoria:initiator',
      data: ''
    })
  }
}

module.exports = SocketController
