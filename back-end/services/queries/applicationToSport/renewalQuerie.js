import { createApplicationToSport } from './createApplicationToSportQuerie.js';
import { findUserByDocument } from '../user/registerUserQuerie.js';
import { createApplicationStatus } from '../applicationStatus/createApplicationStatusQuerie.js';

export const renewalQuerie = async (identification_document, sport_id, sports_entity_id, transaction) => {
    try {
        const { user: userByDocument } = await findUserByDocument(identification_document);

        if (!userByDocument) {
            await transaction.rollback();
            return { status: 404, error: 'Usuario no encontrado' };
        }

        const { birthdate, school_id, user_id } = userByDocument.applications[0];
        console.log(birthdate, school_id, user_id);

        const newApplication = await createApplicationToSport(
            user_id,
            sport_id,
            sports_entity_id,
            school_id,
            birthdate,
            transaction
        );
        console.log(newApplication);

        if (newApplication.status !== 201) {
            await transaction.rollback();
            return { status: newApplication.status, error: newApplication.error };
        }

        await createApplicationStatus(
            'pendiente',
            '',
            newApplication.applicationToSport_id,
            transaction
        );

        await transaction.commit();
        return { status: 201, message: 'Renovación de solicitud creada correctamente' };
        
    } catch (error) {
        await transaction.rollback();
        console.error('Error al renovar la solicitud de deporte:', error);
        throw new Error('Error al renovar la solicitud de deporte');
    }
};
