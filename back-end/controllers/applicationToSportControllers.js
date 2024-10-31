import db from "../config/database.js";
import { registerUser } from "../services/queries/user/registerUserQuerie.js";
import { registerUserLocation } from "../services/queries/userLocation/registerUserLocationQuerie.js";
import { registerPhoto } from "../services/queries/photo/uploadPhotoQuerie.js";
import { createApplicationToSport } from "../services/queries/applicationToSport/createApplicationToSportQuerie.js";
import { createApplicationStatus } from "../services/queries/applicationStatus/createApplicationStatusQuerie.js";
import { findApplicationToSportByUserIdQuerie } from "../services/queries/applicationToSport/findApplicationToSportByUserIdQuerie.js";
import { renewalQuerie } from "../services/queries/applicationToSport/renewalQuerie.js";

export const createApplicationSportNewUser = async (req, res) => {
    const transaction = await db.transaction();
    const { name, lastname, identification_document, birthdate, gender, school, sport_id, phone_number, email, locality_id, neighborhood, street, house_number, sports_entity_id } = req.body;
    const file = req.file;

    console.log('body:', req.body);

    try {
        const { status: statusPhoto, error: errorPhoto, photo_id } = await registerPhoto(file.path, 'photo of the document', transaction);
        if (errorPhoto) {
            await transaction.rollback();
            return res.status(statusPhoto).json({ message: errorPhoto });
        }

        const { status, error, user_id, temporary_password } = await registerUser(
            name,
            lastname,
            identification_document,
            gender,
            email,
            photo_id,
            transaction
        );
        if (error) {
            await transaction.rollback();
            return res.status(status).json({ message: error });
        }

        const { status: statusLocation, error: errorLocation, userLocation_id } = await registerUserLocation(
            user_id,
            locality_id,
            neighborhood,
            street,
            house_number,
            phone_number,
            transaction
        );
        if (errorLocation) {
            await transaction.rollback();
            return res.status(statusLocation).json({ message: errorLocation });
        }

        const { status: statusApplicationToSport, error: errorApplicationToSport, applicationToSport_id } = await createApplicationToSport(
            user_id,
            sport_id,
            sports_entity_id,
            school,
            birthdate,
            transaction
        );
        if (errorApplicationToSport) {
            await transaction.rollback();
            return res.status(statusApplicationToSport).json({ message: errorApplicationToSport });
        }

        const { status: statusApplicationStatus, error: errorApplicationStatus, applicationStatus_id } = await createApplicationStatus(
            'pendiente',
            'Solicitud de deporte pendiente de aprobación',
            applicationToSport_id,
            transaction
        );
        if (errorApplicationStatus) {
            await transaction.rollback();
            return res.status(statusApplicationStatus).json({ message: errorApplicationStatus });
        }

        await transaction.commit();
        return res.status(200).json({
            message: `Su solicitud de beca deportiva ha sido registrada exitosamente, esta es su contraseña temporal: ${temporary_password}, inicialice sesión con esta contraseña y su email o documento y cambie su contraseña, luego podra realizar seguimiento de su solicitud en su pefil`,
            user_id,
            userLocation_id,
            applicationToSport_id,
            applicationStatus_id
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al registrar la solicitud de deporte:', error);
        return res.status(500).json({ error: 'Error al registrar la solicitud de deporte' });
    }
};


export const findApplicationToSportByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const {status, error, applicationToSport} = await findApplicationToSportByUserIdQuerie(user_id);
        
        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json(applicationToSport);

    } catch (error) {
        console.error('Error al buscar la solicitud de deporte:', error);
        return res.status(500).json({ error: 'Error al buscar la solicitud de deporte' });
    }
};

export const renewalApplicationToSport = async (req, res) => {
    const transaction = await db.transaction();
    const { identification_document, sport_id, sports_entity_id } = req.body;

    console.log('body:', req.body);

    try {
        const { status, error, message } = await renewalQuerie(identification_document, sport_id, sports_entity_id, transaction);
        
        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json({ message});

    } catch (error) {
        console.error('Error al renovar la solicitud de deporte:', error);
        return res.status(500).json({ error: 'Error al renovar la solicitud de deporte' });
    }
};