import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';

export const getAllSportsAvailabilitiesQuerie = async() => {
    try{
        const sportsAvailabilities = await SportsAvailabilities.findAll({
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
            return {status: 404, error: 'No se encontraron disponibilidades de deportes'};
        }

        return {status: 200, sportsAvailabilities};
    }catch(error){
        throw new Error('Error finding all sports availabilities: ' + error.message);
    }
};