'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const FirebaseToken = use('App/Models/FirebaseToken')
/**
 * Resourceful controller for interacting with firebasetokens
 */
class FirebaseTokenController {
  
  //POST
  async storeToken ({ request, response, auth }) {
    const { firebase_token } = request.all();

    try {
      const entry = await FirebaseToken.findOrCreate(
        { user_id: auth.user.uid },
        { user_id: auth.user.uid }
      );

      entry.token = firebase_token;
      
      await entry.save()
      response.created({message: 'El token de firebase se guardó exitosamente'})
    } catch (error) {
      response.internalServerError({message: 'Ocurrió un error en el servidor, contacta a un administrador'})
    }
  }

  /**
   * Render a form to be used for creating a new firebasetoken.
   * GET firebasetokens/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new firebasetoken.
   * POST firebasetokens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single firebasetoken.
   * GET firebasetokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing firebasetoken.
   * GET firebasetokens/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update firebasetoken details.
   * PUT or PATCH firebasetokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a firebasetoken with id.
   * DELETE firebasetokens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FirebaseTokenController
