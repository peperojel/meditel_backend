'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('register', 'AuthController.register').validator('auth/Register');
    Route.get('login', 'AuthController.login').validator('auth/Login');

}