import Province from '../../../models/ProvincesModel.js';

export const getAllProvincesQuerie = async () => {
    try {
        const provinces = await Province.findAll({
            attributes: ['id', 'name']
        });
        
        if (!provinces || provinces.length === 0) {
            throw { status: 404, error: 'No se encontraron provincias' };
        }

        return { status: 200, provinces };
    } catch (error) {
        throw new Error('Error finding all provinces: ' + error.message);
    }
};
