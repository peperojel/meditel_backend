'use strict'

const Hash = use('Hash');
const uuid = use('uuid/v1')

const UserHook = exports = module.exports = {};

UserHook.setDefaults = async (userInstance) => {
    userInstance.uid = Math.random().toString(18).substr(2, 8);
    userInstance.confirmation_token = uuid();
    userInstance.verified = false;
}

UserHook.hashPassword = async (userInstance) => {
    if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
    }
}