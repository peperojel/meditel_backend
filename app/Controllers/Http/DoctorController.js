'use strict'

const Doctor = use('App/Models/Doctor');
const Database = use('Database');

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
    const { specialty, rating } = request.all();
    
    const doctor = new Doctor();
    doctor.user_id = user_id;
    doctor.specialty = specialty;
    doctor.rating = rating;
    try {
      await doctor.save();
      return response.status(201).json({
        message: "Su perfil de doctor se ha creado exitosamente "
    });
    } catch (error) {
        return response.status(500).json({
          message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
          error
        });
    }
  }

  /**
   * Responde todos los doctores que están disponibles.
   * GET api/doctor/disponibles
   */
  async getDisponibles ({response }) {
    //const doctor = await Doctor.findBy('available', 0);//cambiar a 1 para disponibles
    //const doctor = await Doctor.all();
    //response.send(doctor);
    const data = await Database
      .select('id_doctor', 'nombre', 'apellido', 'specialty', 'rating')
      .from('doctors')
      .rightJoin('users', 'users.id', 'doctors.user_id')
      .where('disponible', true);

      return response.status(201).json({
        data
      });

    /* const data = Doctor.query();
    data.where('disponible', 1);
    const res  = await data.fetch();
    return response.status(201).json({
      res
    }); */
  }
  /**
   * Responde la información del doctor con doctor_id == id.
   * GET api/doctor/show/:id
   */
  async getInfo ({ params, response }) {
    // Completar con manejo de error
    const doctor = await Doctor.findBy('id_doctor', params.id);
    const user = await User.findBy('user_id', doctor.user_id);//CORROBORAR NOMBRES
    return response.status(201).json({
      name: user.nombre,
      lastname: user.apellido,
      specialty: doctor.specialty,
      rating: doctor.rating
    });
  }
  async changeEstado ({ request, response, auth }) {

    const {disponible} = request.all();

    // Completar con manejo de error

    // Cargar al usuario asociado al token
    const user = await auth.getUser();

    // Cargar al médico cuyo user_id coincide con user.id
    const doctor_data = await Database
      .table('doctors')
      .where('user_id', user.id)
      .first();
    
    const idDoctor = doctor_data.id_doctor;
    const doctor = await Doctor.findBy('id_doctor', idDoctor);

    // Cambio de estado
    doctor.disponible = disponible;

    // Se guarda en la base de datos
    await doctor.save();

    return response.status(201).json({
      message: "Estado cambiado exitosamente"
    });
  }



}

module.exports = DoctorController
