import Sports from "../../../models/SportsModel.js";

export const findAllWhitInactiveSportQuerie = async () => {
    try {
        const sports = await Sports.findAll({
            include: {
                association: 'sports_availabilities',
                attributes: ['total_scholarships', 'scholarships_awarded', 'vacancy_amount']
            },
            order: [['state', 'ASC']]
        });

        if (!sports) {
            return { status: 404, error: 'No se encontraron deportes' };
        }

        return { status: 200, sports };

    } catch (error) {
        throw new Error('Error al buscar los deportes', error);
    }
};