import User from '../../../models/UsersModel.js';
import { checkPassword } from '../../../utils/checkPassword.js';
import { generateJWT } from '../../../utils/jwtHelpers.js';

export const loginQuerie = async (email, password) => {

    console.log(email);

    try {
        const user = await User.findOne(
            {
                where: { email: email },
                include: [
                    {
                        association: 'photo',
                        attributes: ['id', 'photo']
                    }
                ]
            }
        );

        if (!user) {
            return { status: 404, error: 'Usuario no encontrado' };
        }

        console.log(user.name);

        console.log(email);

        const isValidPassword = checkPassword(password, user.password);

        console.log(isValidPassword);
        console.log(password);

        if (!isValidPassword) {
            return { status: 401, error: 'Contraseña incorrecta' };
        }

        const token = generateJWT(user.id);

        const { password: _, ...userWithoutPassword } = user.dataValues;

        return { status: 200, user: userWithoutPassword, token: token };
    } catch (error) {
        throw new Error("Error en loginQuerie: " + error);
    }
};