'use strict'

const User = use('App/Models/User');
const Mail = use('Mail')

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
            await Mail.send('emails.welcome', { token: user.confirmation_token }, (message) => {
                message.to(user.email);
                message.from('no-reply@meditel.cl', 'MediTel');
                message.subject('Bienvenido a MediTel');
              });
            return response.status(201).json({
                // Esta respuesta debe ser revisada
                message: 'Se ha enviado un correo de verificación a ' + user.email
            });
        }
        return response.status(500).json({
            message: 'Algo salió mal. Intenta otra vez o contacta a un administrador.'
            });
    }

    // POST
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

    //GET
    async confirmEmail({ request, response, params, view}) {
        // const bestFormat = request.accepts(['json', 'html']);
        const token = params.token;
        try{
            const user = await User.findBy('confirmation_token', token);
            if (user.verified) {
                return response.status(422).json({
                    message: "Este correo ya fue verificado"
                });
            }
            user.verified = true;
            await user.save();
            return response.status(200).json({
                message: "Su correo ha sido verificado"
            });
        }
        catch (error) {
            return response.status(400).json({
                message: "Ha ocurrido un error en la verificación"
            });
        }
    }
}

module.exports = AuthController;
