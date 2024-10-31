import Localities from '../../../models/LocalitiesModel.js';

export const updateLocalityQuerie = async (id, name, province_id) => {
    try {
        const locality = await Localities.findByPk(id);

        if (!locality) {
            throw { status: 404, error: 'No se encontró la localidad' };
        }

        locality.name = name;
        locality.province_id = province_id;

        await locality.save();

        return { status: 200, locality };
    } catch (error) {
        throw new Error('Error updating locality: ' + error.message);
    }
};