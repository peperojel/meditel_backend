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
  async getDisponibles ({response }) {
    //const doctor = await Doctor.findBy('available', 0);//cambiar a 1 para disponibles
    //const doctor = await Doctor.all();
    //response.send(doctor);
    const data = Doctor.query();
    data.where('available', 0);//CAMBIAR A 1 CUANDO SE CAMBIEN LOS ESTADOS
    const res  = await data.fetch();
    return response.status(201).json({
      res
    });
  }
  /**
   * Responde la información del doctor con doctor_id == id.
   * GET api/doctor/show/:id
   */
  async getInfo ({ params, response }) {
    // Completar con manejo de error
    const doctor = await Doctor.findBy('doctor_id', params.id);
    return response.status(201).json({
      name: doctor.first_name,
      lastname: doctor.last_name,
      specialty: doctor.specialty,
      rating: doctor.rating
    });
  }
  async changeEstado ({ request, response, auth }) {
    // Completar con manejo de error
    const {id}= request.all()
    //const doctor= await Doctor.findBy('doctor_id', id);
    const doctor= await Doctor.findBy('doctor_id', id);
    if (doctor.available){
      doctor.available=0;
    }else{
      doctor.available=1;
    }
    await doctor.save();
    return response.status(201).json({
      message: "Estado cambiado exitosamente"
    });
  }



}

module.exports = DoctorController
