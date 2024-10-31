import Sports from "../../../models/SportsModel.js";

export const deleteSportQuerie = async (id) => {
    try {
        const sport = await Sports.findByPk(id);

        if (!sport) {
            return { status: 404, error: 'No se encontró el deporte' };
        }

        const newSport = await sport.update({ state: 'inactive' });

        return { status: 200, message: 'Deporte eliminado con éxito' };

    } catch (error) {
        throw new Error('Error al eliminar el deporte', error);
    }
}