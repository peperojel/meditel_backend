'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.group(use('App/Routes/Auth')).prefix('api/auth');
Route.group(use('App/Routes/Doctor')).prefix('api/doctor');
Route.group(use('App/Routes/Agenda')).prefix('api/agenda');
Route.group(use('App/Routes/Paciente')).prefix('api/paciente');
Route.group(use('App/Routes/Asesoria')).prefix('api/asesoria');
Route.group(use('App/Routes/FirebaseToken')).prefix('api/firebase');