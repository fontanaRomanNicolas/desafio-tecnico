import User from '../../../models/UsersModel.js';
import bcrypt from 'bcrypt';
export const registerUser = async (name, lastname, identification_document, gender, email, photo_id, transaction = null) => {
    try {

        const { user: userByEmail } = await findUserByEmail(email);

        const { user: userByDocument } = await findUserByDocument(identification_document);

        if (userByEmail) {
            console.log('El email ya se encuentra registrado');
            return { status: 400, error: 'El email ya se encuentra registrado' };
        }

        if (userByDocument) {
            return { status: 409, error: 'Por lo visto ya te encuentras registrado, ¿Quieres realizar seguimiento de tu beca? o ¿Deseas renovar?' };
        }

        const newUser = await User.create(
            {
                name,
                lastname,
                identification_document,
                gender,
                email,
                password: await bcrypt.hash(identification_document, 10),
                photo_id,
                rol: 'user',
            },
            { transaction }
        );

        if (!newUser) {
            return { status: 500, error: 'Error al registrar el usuario' };
        }

        return { status: 201, user_id: newUser.id, temporary_password: identification_document };

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw new Error('Error al registrar el usuario');
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return { status: 200, user };
    } catch (error) {
        console.error('Error al buscar el usuario por email:', error);
        throw new Error('Error al buscar el usuario por email');
    }
};

export const findUserByDocument = async (identification_document) => {

    console.log('identification_document:', identification_document);

    try {
        const user = await User.findOne(
            {
                where: { identification_document },
                include: {
                    association: 'applications',
                    attributes: ['birthdate', 'school_id', 'user_id'],
                }
            },
        );

        console.log('user:', user);

        return { status: 200, user };
    } catch (error) {
        console.error('Error al buscar el usuario por documento:', error);
        throw new Error('Error al buscar el usuario por documento');
    }
};

export const findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return { status: 200, user };
    } catch (error) {
        console.error('Error al buscar el usuario por id:', error);
        throw new Error('Error al buscar el usuario por id');
    }
};