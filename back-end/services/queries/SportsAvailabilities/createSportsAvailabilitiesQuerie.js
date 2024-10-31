import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';

export const createSportsAvailabilitiesQuerie = async (sports_id, sports_entity_id, total_scholarships) => {
    
    console.log(sports_id, sports_entity_id, total_scholarships)

    try{
        const sportsAvailabilities = await SportsAvailabilities.findOne({
            where: {
                sports_id,
                sports_entity_id
            }
        })

        if(sportsAvailabilities){
            return {
                status: 400,
                error: 'La beca en el club ya existe'
            }
        }

        const newSportsAvailabilities = await SportsAvailabilities.create({
            sports_id: sports_id,
            sports_entity_id,
            total_scholarships,
            scholarships_awarded: 0,
            vacancy_amount: total_scholarships
        });
        

        return {
            status: 201,
            sportsAvailabilities: newSportsAvailabilities
        }
    }catch(error){
        throw new Error('Error creating sports availabilities: ' + error.message);
    }
};