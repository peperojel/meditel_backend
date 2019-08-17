'use strict'

const Hash = use('Hash');

const UserHook = exports = module.exports = {};

UserHook.setDefaults = async (userInstance) => {
    userInstance.uid = Math.random().toString(18).substr(2, 8);
}

UserHook.hashPassword = async (userInstance) => {
    if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
    }
}