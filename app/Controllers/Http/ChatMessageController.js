'use strict'

const ChatMessage =use('App/Models/ChatMessage');

class ChatMessageController {
  /**
   * POST api/message/post
   * Muestra los 20 mensajes más recientes de una determinada asesoría
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
