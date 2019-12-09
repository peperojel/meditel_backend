'use strict'

const moment = require('moment');
const ChatMessage =use('App/Models/ChatMessage');

class ChatMessageController {
  /**
   * POST api/message/post
   * Crea una nueva entrada en la tabla ChatMessage de una determinada sesión de chat.
   *
   * @param {Parámetros (id,fecha)} params
   * @param {Request} request
   * @param {Response} response
   * @param {object} auth
   */
  async post ({ request, response, auth }) {
    const newMessage = new ChatMessage();
    const { id_asesoria, type, content } = request.all();
    const id_user = auth.user.uid;

    newMessage.id_asesoria = id_asesoria;
    newMessage.id_user = id_user;
    newMessage.type = type;
    newMessage.content = content;

    try {
      await newMessage.save();
      response.created();
    } catch (error) {
      response.internalServerError({
        message: 'Ocurrió un error en el servidor, contacta a un administrador',
        error: error
      });
    }
  }

  /**
   * POST api/message/getlast/
   * Responde todos los mensajes a partir de timestamp
   *
   * @param {Parámetros (id,fecha)} params
   * @param {Request} request
   * @param {Response} response
   * @param {object} auth
   */
  async getLastMessages ({ request, response, auth }) {
    const { id_asesoria, timestamp } = request.all();
    const fechaLastMessage = moment(timestamp).utcOffset("-03:00").format();

    try {
      const lastMessageBruto = await auth.user.messages()
        .where( { created_at: fechaLastMessage, id_asesoria: id_asesoria })
        .fetch();

      const lastMessage_id = lastMessageBruto.rows[0].id;

      const newMessages = await ChatMessage.query()
        .orderBy('chat_messages.id', 'desc')
        .select('users.role', 'type', 'content', 'chat_messages.created_at')
        .where('chat_messages.id', '>', lastMessage_id)
        .innerJoin('users','chat_messages.id_user', 'users.uid')
        .fetch();
      
      response.created(newMessages);
    } catch (error) {
      response.internalServerError({
        message: 'Ocurrió un error en el servidor, contacta a un administrador',
        error: error
      });
    }
  }

  /**
   * Render a form to be used for creating a new chatmessage.
   * GET chatmessages/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new chatmessage.
   * POST chatmessages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single chatmessage.
   * GET chatmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing chatmessage.
   * GET chatmessages/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update chatmessage details.
   * PUT or PATCH chatmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a chatmessage with id.
   * DELETE chatmessages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ChatMessageController
