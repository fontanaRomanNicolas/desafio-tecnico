import ApplicationSport from '../../../models/ApplicationToSportsModel.js';

export const createApplicationToSport = async (user_id, sport_id, sports_entity_id, school_id, birthdate, transaction = null) => {
    try {
        const applicationToSport = await ApplicationSport.create(
            {
            user_id,
            sport_id,
            sports_entity_id,
            school_id,
            birthdate
        },
        { transaction }
    );

        if (!applicationToSport) {
            return { status: 500, error: 'Error al registrar la solicitud de deporte' };
        }

        return { status: 201, applicationToSport_id: applicationToSport.id };
    } catch (error) {
        console.error('Error al registrar la solicitud de deporte:', error);
        throw new Error('Error al registrar la solicitud de deporte');
    }
};