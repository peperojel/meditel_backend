'use strict'

const Route = use('Route');

module.exports = () => {

    Route.post('store', 'FirebaseTokenController.storeToken').middleware('jwtAuth');
}