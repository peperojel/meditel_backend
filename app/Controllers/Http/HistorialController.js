'use strict'
const Doctor = use('App/Models/Doctor');
const Database = use('Database');
const User = use('App/Models/User');
const Paciente =use('App/Models/Paciente');
const Historial =use('App/Models/Historial');
const Asesoria =use('App/Models/Asesoria');
class HistorialController {
      /**
   * traspaso de la asesoría agendada al historial de asesorías
   * POST api/historial/create
   */
  async create ({ request, response , auth }) {
    const { id_asesoria } = request.all();
    const asesoria = await  Asesoria.findBy('id_asesoria', id_asesoria);
    
    const historial = new Historial();
    historial.id_asesoria = asesoria.id_asesoria;
    historial.id_doctor = asesoria.id_doctor;
    historial.id_paciente = asesoria.id_paciente;
    historial.fecha= asesoria.fecha;
    try {
      await historial.save();
      await asesoria.delete();
      return response.status(201).json({
        message: "Historial creado exitosamente "
    });
    
    } catch (error) {
        return response.status(500).json({
          message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
          error
        });
    }
    
  }
  async final ({ request, response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        const { id_asesoria,rating,comentario,diagnostico } = request.all();
        const historial = await Historial.findBy('id_asesoria', id_asesoria);
        if (role == 'medico') {
            
            historial.ev_pac = rating;
            historial.com_pac = comentario;
            historial.diagnostico = diagnostico;
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Paciente evaluado y diagnosticado exitosamente'
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
        if (role == 'paciente') {
            historial.ev_doc = rating;
            historial.com_doc = comentario;
            try {
                await historial.save();             
            return response.status(201).json({
                message: 'Dr evaluado  exitosamente'
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
                  
        }
        
            
    }
    async getHistorial ({ response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            // Cargar al médico cuyo user_id coincide con user.id
            const doctor_data = await Doctor.findBy('user_id', user.id);
            const idDoctor = doctor_data.id_doctor;
            try {
                const data = await Historial.query().select('nombre', 'apellido', 'fecha', 'id_asesoria','ev_pac','com_pac','diagnostico')
            .innerJoin('pacientes','historials.id_paciente', 'pacientes.id_pacientes').where('id_doctor',idDoctor)
            .innerJoin('users','pacientes.user_id', 'users.id').fetch();
            return response.status(201).json({
                data
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
          
        }
        if (role == 'paciente') {
            // Cargar al paciente cuyo user_id coincide con user.id
            const paciente_data =  await Paciente.findBy('user_id', user.id);
            const idPaciente = paciente_data.id_paciente;
            try {
                const data = await Historial.query().select('nombre', 'apellido', 'fecha', 'id_asesoria','ev_doc','com_doc','diagnostico')
            .innerJoin('doctors','historials.id_doctor', 'doctors.id_doctor').where('id_paciente',idPaciente)
            .innerJoin('users','doctors.user_id', 'users.id').fetch();
            return response.status(201).json({
                data
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
    }
    async getComentarios ({ params,response , auth }) {
        const user = await auth.getUser();
        const role= user.role;
        if (role == 'medico') {
            try {
                const data = await Historial.query().select('com_pac')
            .where('id_paciente',params.id)
            .fetch();
            return response.status(201).json({
                data
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
          
        }
        if (role == 'paciente') {
            
            try {
                const data = await Historial.query().select('com_doc')
            .where('id_doctor',params.id)
            .fetch();
            return response.status(201).json({
                data
            });
              } catch (error) {
                  return response.status(500).json({
                    message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.',
                    error
                  });
              }
            
        }
    }

      


  




}

module.exports = HistorialController
