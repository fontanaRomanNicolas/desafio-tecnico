import User from '../../../models/UsersModel.js';
import {checkPassword} from '../../../utils/checkPassword.js';
import { findUserById } from './registerUserQuerie.js';
import bcrypt from 'bcrypt';

export const changePassword = async (id, password, newPassword) => {

    try {
        const { user } = await findUserById(id);

        if (!user) {
            return { status: 404, error: 'Usuario no encontrado' };
        }

        const isPasswordCorrect = await checkPassword(password, user.password);

        console.log('isPasswordCorrect:', isPasswordCorrect);

        if (!isPasswordCorrect) {
            return { status: 400, error: 'Contraseña incorrecta' };
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { status: 200, message: 'Contraseña actualizada correctamente'};

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw new Error('Error al cambiar la contraseña');
    }

};