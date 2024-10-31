import Localities from '../../../models/LocalitiesModel.js';

export const deleteLocalityQuerie = async (id) => {
    try {
        const locality = await Localities.findByPk(id);

        if (!locality) {
            throw { status: 404, error: 'No se encontró la localidad' };
        }

        const newLocality = await locality.update({
            state: 'inactive'
        });

        return { status: 200, newLocality };
    } catch (error) {
        throw new Error('Error deleting locality: ' + error.message);
    }
};