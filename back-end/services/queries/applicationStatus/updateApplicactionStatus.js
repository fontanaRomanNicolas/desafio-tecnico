import ApplicationStatus from "../../../models/ApplicationStatusesModel.js";
import SportsAvailabilities from "../../../models/SportsAvailabilitiesModel.js";

export const updateApplicationStatus = async (state, comment, id, transaction) => {
    try {
        const applicationStatus = await ApplicationStatus.findOne({
            where: { id },
            include: {
                association: 'application',
                attributes: ['sport_id', 'sports_entity_id'],
            }
        });

        if (!applicationStatus) {
            await transaction.rollback();
            return { status: 404, error: 'Estado de solicitud de deporte no encontrado' };
        }

        if (state === 'aprobado' || state === 'rechazado') {
            applicationStatus.state = state;
            applicationStatus.comment = comment;
            await applicationStatus.save();

            if (state === 'aprobado') {
                const sportsAvailabilities = await SportsAvailabilities.findOne({
                    where: {
                        sports_id: applicationStatus.application.sport_id,
                        sports_entity_id: applicationStatus.application.sports_entity_id
                    }
                });

                if (!sportsAvailabilities) {
                    await transaction.rollback();
                    return { status: 404, error: 'Entidad deportiva no encontrada' };
                }

                sportsAvailabilities.vacancy_amount -= 1;
                sportsAvailabilities.scholarships_awarded += 1;
                await sportsAvailabilities.save();
            }

            await transaction.commit();
            return { status: 201, applicationStatus_id: applicationStatus.id };

        } else {
            await transaction.rollback();
            return { status: 400, error: 'El estado de la solicitud de deporte no es válido' };
        }
    } catch (error) {
        await transaction.rollback();
        console.error('Error al registrar el estado de la solicitud de deporte:', error);
        throw new Error('Error al registrar el estado de la solicitud de deporte');
    }
};
