'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('register', 'AuthController.register').validator('auth/Register');
    Route.post('login', 'AuthController.login').validator('auth/Login');
    
    Route.get('confirm/email/:token', 'AuthController.confirmEmail').as('auth.confirm.email');

}