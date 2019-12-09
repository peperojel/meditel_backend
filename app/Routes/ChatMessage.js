'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('post', 'ChatMessageController.post')
        .middleware(['jwtAuth', 'asesoriaPerm']);

    Route.post('getlast', 'ChatMessageController.getLastMessages')
        .middleware(['jwtAuth', 'asesoriaPerm']);
}