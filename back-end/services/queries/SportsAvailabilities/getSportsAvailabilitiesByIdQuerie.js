import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';

export const getSportsAvailabilitiesByIdQuerie = async(id) => {
    try{
        const sportsAvailabilities = await SportsAvailabilities.findOne({
            where: {
                id: id
            },
            include: [
                {
                    association: 'sport',
                },
                {
                    association: 'sports_entity',
                }
            ]
        });

        if(!sportsAvailabilities || sportsAvailabilities.length === 0){
            return {status: 404, error: 'No se encontro la disponibilidad de deporte'};
        }

        return {status: 200, sportsAvailabilities};
    }catch(error){
        throw new Error('Error finding all sports availabilities: ' + error.message);
    }
};