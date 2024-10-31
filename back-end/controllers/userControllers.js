import { changePassword } from "../services/queries/user/changePasswordQuerie.js";
import { findUserByDocument } from "../services/queries/user/registerUserQuerie.js";

export const changePasswordController = async (req, res) => {
    const { password, newPassword } = req.body;

    const { id } = req.user;

    console.log('id:', id);

    console.log('password:', password);
    console.log('newPassword:', newPassword);

    try {
        const { status, message, error } = await changePassword(id, password, newPassword);

        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json({ message });

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        return res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
};

export const getUserController = async (req, res) => {
    const { identification_document } = req.params;

    try {
        const { status, user, error } = await findUserByDocument(identification_document);

        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json(user);

    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};