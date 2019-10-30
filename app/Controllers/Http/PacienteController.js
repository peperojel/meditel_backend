'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');

class PacienteController {
    /**
   * Responde la información del doctor con doctor_id == id.
   * GET api/doctor/show/:id
   */
  async getInfo ({ params, response }) {
    
    const paciente = await Paciente.findBy('id_paciente', params.id);
    const user = await User.findBy('id', paciente.user_id);
    return response.status(201).json({
      name: user.nombre,
      lastname: user.apellido,
      nacionalidad: paciente.nacionalidad,
      rating: paciente.rating,
      nacimiento: paciente.disponible 
    });
  }









}

module.exports = PacienteController
