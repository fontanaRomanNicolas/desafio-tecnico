import SportsAvailabilities from '../../../models/SportsAvailabilitiesModel.js';

export const updateSportsAvailabilitiesQuerie = async (sports_id, sports_entity_id, total_scholarships, scholarships_awarded, vacancy_amount) => {
    try {
        const sportsAvailabilities = await SportsAvailabilities.findOne({
            where: {
                sports_id: sports_id.value,
                sports_entity_id: sports_entity_id.value
            }
        });

        if (!sportsAvailabilities) {
            return { status: 404, error: 'No se encontro la beca deportiva' };
        };
        
        sportsAvailabilities.total_scholarships = total_scholarships;
        sportsAvailabilities.scholarships_awarded = scholarships_awarded;
        sportsAvailabilities.vacancy_amount = vacancy_amount;
        await sportsAvailabilities.save();

        return { status: 200, sportsAvailabilities };


    } catch (error) {
        throw new Error('Error updating sports availabilities: ' + error.message);
    }
};
