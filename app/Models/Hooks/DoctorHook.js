'use strict'

const DoctorHook = exports = module.exports = {}

DoctorHook.setDefaults = async (doctorInstance) => {
        doctorInstance.id_doctor = Math.random().toString(18).substr(2, 8);
        doctorInstance.disponible = false;
}