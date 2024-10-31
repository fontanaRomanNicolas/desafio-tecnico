import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';

export const deleteSportsAvailabilitiesQuerie = async (sports_id, sports_entity_id) => { 

    console.log(sports_id, sports_entity_id)

    try{
        const sportsAvailabilities = await SportsAvailabilities.findOne({
            where: {
                sports_id,
                sports_entity_id
            }
        })

        if(!sportsAvailabilities){
            return {
                status: 404,
                error: 'La beca en el club no existe'
            }
        }

        await SportsAvailabilities.destroy({
            where: {
                sports_id,
                sports_entity_id
            }
        });

        return {
            status: 200,
            sportsAvailabilities: sportsAvailabilities
        }
    }catch(error){
        throw new Error('Error deleting sports availabilities: ' + error.message);
    }
};