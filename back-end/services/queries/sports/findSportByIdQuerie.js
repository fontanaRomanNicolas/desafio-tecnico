import Sports from "../../../models/SportsModel.js";

export const findSportByIdQuerie = async (id) => {
    try {
        const sport = await Sports.findOne({
            where: { id },
        });

        if (!sport) {
            return { status: 404, error: 'Deporte no encontrado' };
        }

        return { status: 200, sport };

    } catch (error) {
        throw new Error('Error al buscar el deporte', error);
    }
};