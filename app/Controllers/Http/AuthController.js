'use strict'

const User = use('App/Models/User');

class AuthController {

    // POST
    async register({ request, response, auth }) {

        const { email, password, role } = request.all();
        const user = new User();
        user.email = email;
        user.password = password;
        user.role = role;
        const res = await user.save();
        if (res) {
            return response.status(201).json({
                message: 'La cuenta se ha creado satisfactoriamente.'
            });
        }
        return response.status(500).json({
            message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.'
            });
    }

    // GET
    async login({ request, response, auth}) {
        const { email , password } = request.all();
        try {
            const result = await auth.withRefreshToken().attempt(email, password);
            const user = await User.findBy('email', email);
            return response.status(200).json(result);
        }
        catch (errors) {
            return response.status(401).json({
                message: 'No existe un usuario con dichas credenciales.'
                });
        }
    }

}

module.exports = AuthController
