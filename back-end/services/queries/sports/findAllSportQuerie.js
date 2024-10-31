import Sports from "../../../models/SportsModel.js";

export const findAllSportQuerie = async () => {
    try {
        const sports = await Sports.findAll({
            where: { state: 'active' },
            include: {
                association: 'sports_availabilities',
                attributes: ['total_scholarships', 'scholarships_awarded', 'vacancy_amount']
            }
        });

        if (!sports) {
            return { status: 404, error: 'No se encontraron deportes' };
        }

        return { status: 200, sports };

    } catch (error) {
        throw new Error('Error al buscar los deportes', error);
    }
};