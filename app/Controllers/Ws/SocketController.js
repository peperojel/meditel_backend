'use strict'

const SocketConnection = use('App/Models/SocketConnection')

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
        this.sendRequest();
        break;
      case 'asesoria:accept':
        this.socket.emitTo('message',
          { type: 'asesoria:accept',
            data: {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'asesoria:refuse':
        this.socket.emitTo('message',
          {
            type: 'asesoria:refuse',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'asesoria:diagnostic':
        this.socket.emitTo('message',
          {
            type: 'asesoria:diagnostic',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      case 'asesoria:finished':
        this.socket.emitTo('message',
          {
            type: 'asesoria:finished',
            data:
            {
              from_socket: this.socket.id
            }
          },
          [data.to_socket]
        );
        break;
      // Lógica de chat
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
      case 'asesoria:signaling':
        this.socket.broadcast('message', {
          type: 'asesoria:signaling',
          data: data
        });
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

  // Métodos de uso interno
  async sendRequest () {
    const doctor_socket = await SocketConnection
      .query()
      .where({
        topic: this.socket.topic,
        role: 'medico'
      })
      .first()
    
    this.socket.emitTo('message',{
      type: 'asesoria:request',
      data: {
        nombre: this.auth.user.nombre,
        apellido: this.auth.user.apellido,
        from_socket: this.socket.id
        }
      },
      [doctor_socket.socket_id]
    )
  }


  async storeConnection () {
    const sc = await SocketConnection.findOrCreate(
      { 
        topic: this.socket.topic,
        user_id: this.auth.user.uid 
      },
      { 
        topic: this.socket.topic,
        user_id: this.auth.user.uid,
        role: this.auth.user.role,
      }
    )
    sc.socket_id = this.socket.id
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
