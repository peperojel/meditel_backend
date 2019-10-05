'use strict'

const Doctor = use('App/Models/Doctor');

/**
 * Controladores para la interacción con los Doctores.
 */
class DoctorController {

  /**
   * Creación de un nuevo Doctor en la base de datos
   * POST api/doctor/create
   */
  async create ({ request, response , auth }) {
    const user = await auth.getUser();
    const user_id = user.id;
    const { first_name, last_name, specialty, rating } = request.all();
    
    const doctor = new Doctor();
    doctor.user_id = user_id;
    doctor.first_name = first_name;
    doctor.last_name = last_name;
    doctor.specialty = specialty;
    doctor.rating = rating;

    try {
      await doctor.save();
      return response.status(201).json({
        message: "Su perfil de doctor se ha creado exitosamente "
    });
    } catch (error) {
        return response.status(500).json({
          message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.'
        });
    }
  }

  /**
   * Responde todos los doctores que están disponibles.
   * GET api/doctor/disponibles
   */
  async getDisponibles ({ request, response }) {
    // Implementar
  }


  /**
   * Responde la información del doctor con doctor_id == id.
   * GET api/doctor/show/:id
   */
  async getInfo ({ params, response }) {
    // Completar
    const doctor = await Doctor.findBy('doctor_id', params.id);
    return response.status(201).json({
      message: 'El nombre del doctor es ' + doctor.first_name
    });
  }

}

module.exports = DoctorController
