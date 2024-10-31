import Localities from '../../../models/LocalitiesModel.js';

export const createLocalityQuerie = async (name, province_id) => {
    try {
        const locality = await Localities.findOne({
            where: {
                name,
                province_id
            }
        });

        if (locality) {
            return {status: 409, error: 'La localidad ya existe'};
        };

        const newLocality = await Localities.create({
            name,
            province_id
        });

        return { status: 201, locality };
    } catch (error) {
        throw new Error('Error creating locality: ' + error.message);
    }
};