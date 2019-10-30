'use strict'

class AgendaController {

    async create ({ request, response , auth }) {
        const user = await auth.getUser();
    // Cargar al médico cuyo user_id coincide con user.id
        const doctor_data = await Database
        .table('doctors')
        .where('user_id', user.id)
        .first();
        
        const idDoctor = doctor_data.id_doctor;
        const { startDate, endDate } = request.all();
        
        const agenda = new Agenda();
        agenda.id_doctor = idDoctor;
        agenda.startDate = startDate;
        agenda.endDate = endDate;
        try {
          await agenda.save();
          return response.status(201).json({
            message: "Bloque de agenda se ha creado exitosamente "
        });
        } catch (error) {
            return response.status(500).json({
              message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
              error
            });
        }
      }

    async getAgenda ({ response, auth }) {
    // Cargar al usuario asociado al token
    const user = await auth.getUser();

    // Cargar al médico cuyo user_id coincide con user.id
    const doctor_data = await Database
      .table('doctors')
      .where('user_id', user.id)
      .first();
    
    const idDoctor = doctor_data.id_doctor;
    const data = Agenda.query();
    data.where('id_doctor', idDoctor);
    

    try {
        const res  = await data.fetch();
        return response.status(201).json({
          res
      });
      } catch (error) {
          return response.status(500).json({
            message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
            error
          });
      }
  }

  async deleteBloque ({ params, response }) {
    //TO DO: comprobar que el bloque corresponde al dr (solicitar token)
    const bloque = await Agenda.findBy('id_bloque', params.id);
    // Se elimina de la base de datos
    await bloque.delete();

    return response.status(201).json({
      message: "Bloque eliminado exitosamente"
    });
  }
    
}

module.exports = AgendaController
