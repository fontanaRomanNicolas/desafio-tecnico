import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';
import { Op } from 'sequelize';
export const getSportsAvailabilitiesByEntityQuerie = async (id) => {
    try{
        const sportsAvailabilities = await SportsAvailabilities.findAll({
            where: {
                sports_entity_id: id,
                vacancy_amount: {
                    [Op.gt]: 0
                }
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
            return {status: 404, error: 'No se encontraron disponibilidades de deportes en esta entidad deportiva'};
        }

        return {status: 200, sportsAvailabilities};
    }catch(error){
        throw new Error('Error finding all sports availabilities: ' + error.message);
    }
};