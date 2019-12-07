'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('post', 'ChatMessageController.post')
        .middleware(['jwtAuth', 'asesoriaPerm']);

    Route.get('load/:id/:fecha?', 'ChatMessageController.load')
        .middleware(['jwtAuth', 'asesoriaPerm']);
}