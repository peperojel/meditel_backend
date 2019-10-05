'use strict'

const DoctorHook = exports = module.exports = {}

DoctorHook.setDefaults = async (doctorInstance) => {
        doctorInstance.doctor_id = Math.random().toString(18).substr(2, 8);
        doctorInstance.available = false;
}