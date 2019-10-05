'use strict'

class JwtAuth {
  /**
   * Validación de que se proporcionó un token válido
   */
  async handle ({ response, auth }, next) {
    try{
      await auth.check();
    } catch (error) {
      return response.status(401).json({ message: 'Missing or invalid token'});
    }
    
    await next();
  }
}

module.exports = JwtAuth;
