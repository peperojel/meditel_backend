'use strict'

const Event = use('Event');
const SocketConnection = use('App/Models/SocketConnection');
const Asesoria = use('App/Models/Asesoria');

class SocketController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    this.sc = new SocketConnection()
    this.storeConnection()
  }

  onMessage (message) {
    const {type, data} = message

    switch (type) {
      // Lógica de asesoría
      case 'asesoria:request':
        Event.fire('new::asesoria', this);
        break;
      case 'asesoria:accept':
        Event.fire('accept::'+data.id_asesoria, this, data);
        break;
      case 'asesoria:refuse':
        Event.fire('refuse::'+data.id_asesoria, this, data);
        break;
      case 'asesoria:finished':
        Event.fire('finished::asesoria', this, data);
        break;
      // Lógica de chat
      case 'chat:update':
        this.socket.emitTo('message',
          {
            type: 'chat:update',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'chat:videollamada_request':
        this.socket.emitTo('message',
          {
            type: 'chat:videollamada_request',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'chat:videollamada_accept':
        this.socket.emitTo('message',
          {
            type: 'chat:videollamada_accept',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'chat:videollamada_refuse':
        this.socket.emitTo('message',
          {
            type: 'chat:videollamada_refuse',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'videollamada:signaling':
        this.socket.emitTo('message',
          {
            type: 'videollamada:signaling',
            data:
            { 
              signal: data.signal,
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
      break;
      // Lógica de Videollamada
      case 'videollamada:ready':
        this.updateState([this.socket.id, data.to_socket])
        break;
      case 'videollamada:finished':
          this.socket.emitTo('message',
          {
            type: 'videollamada:finished',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      default:
        // console.log("Default case")
      break;
    }
  }

  onClose () {
    this.deleteConnection(this.sc)
  }

  async storeConnection () {
    const sc = await SocketConnection.findOrCreate(
      { 
        topic: this.socket.topic,
        id_user: this.auth.user.uid 
      },
      { 
        topic: this.socket.topic,
        id_user: this.auth.user.uid,
        role: this.auth.user.role,
      }
    )
    sc.id_socket = this.socket.id
    sc.is_ready = false
    this.sc = sc
    await sc.save();
  }

  async updateState (toSockets) {
    this.sc.is_ready = true
    await this.sc.save()
    const part = await SocketConnection
          .query()
          .where({
            topic: this.socket.topic,
            is_ready: true})
          .fetch()
    if(part.toJSON().length === 2) {
      this.sendReady(toSockets);
    }
  }

  async deleteConnection (sc) {
    await sc.delete();
  }

  sendReady = (toSockets) => {
    this.socket.emitTo('message', {
      type: 'videollamada:ready',
      data: ''
    }, toSockets);
  }
}

module.exports = SocketController
