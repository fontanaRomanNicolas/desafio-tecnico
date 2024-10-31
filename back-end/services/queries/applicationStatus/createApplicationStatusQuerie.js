import ApplicationStatus from "../../../models/ApplicationStatusesModel.js";

export const createApplicationStatus = async (state, comment, application_to_sport_id, transaction = null) => {
    try {
        const applicationStatus = await ApplicationStatus.create(
            {
                state,
                comment,
                application_to_sport_id
            },
            { transaction }
        );

        if (!applicationStatus) {
            return { status: 500, error: 'Error al registrar el estado de la solicitud de deporte' };
        }

        return { status: 201, applicationStatus_id: applicationStatus.id };
    } catch (error) {
        console.error('Error al registrar el estado de la solicitud de deporte:', error);
        throw new Error('Error al registrar el estado de la solicitud de deporte');
    }
};