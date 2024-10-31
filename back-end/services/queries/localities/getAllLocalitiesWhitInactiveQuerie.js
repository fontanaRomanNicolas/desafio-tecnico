import Localities from '../../../models/LocalitiesModel.js';

export const getAllLocalitiesWhitInactiveQuerie = async () => {
    try{
        const localities = await Localities.findAll({
            attributes: ['id', 'name'],
            include: {
                association: 'province',
                attributes: ['id', 'name']
            }
        });

        if (!localities || localities.length === 0) {
            throw { status: 404, error: 'No se encontraron localidades' };
        }

        return { status: 200, localities };
    }catch (error) {
        throw new Error('Error finding all localities: ' + error.message);
    }
};