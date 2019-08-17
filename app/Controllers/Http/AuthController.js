'use strict'

const User = use('App/Models/User');

class AuthController {

    async register({ request, response, auth }) {

        const { email, password, role } = request.all();
        const user = new User();
        user.email = email;
        user.password = password;
        user.role = role;
        
        const res = await user.save();
        
        if (res) {
            const result = await auth.withRefreshToken().generate(user);
            return response.status(201).json(result);
        }
        
        return response.status(500).json({
            message: 'Something went wrong. Try again or contact admin.',
            });
    }

}

module.exports = AuthController
