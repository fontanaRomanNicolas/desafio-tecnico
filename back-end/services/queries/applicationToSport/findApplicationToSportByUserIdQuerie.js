import ApplicationSport from '../../../models/ApplicationToSportsModel.js';
import ApplicationStatuses from '../../../models/ApplicationStatusesModel.js';
import User from '../../../models/UsersModel.js';
import SportsEntities from '../../../models/SportsEntitiesModel.js';
import Sports from '../../../models/SportsModel.js';
import Schools from '../../../models/SchoolsModel.js';

export const findApplicationToSportByUserIdQuerie = async (user_id) => {
    try {
        const applicationToSport = await ApplicationSport.findAll({
            where: { user_id: user_id },
            attributes: ['id', 'birthdate'],
            include: [
                {
                    model: ApplicationStatuses,
                    as: 'statuses'
                },
                {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'email', 'gender']
                    },
                    include: {
                        association: 'photo',
                        attributes: ['id', 'photo']
                    }
                },
                {
                    model: SportsEntities,
                    as: 'sportsEntity',
                    attributes: {
                        include: [ 'id', 'name']
                    }
                },
                {
                    model: Sports,
                    as: 'sport',
                    attributes: {
                        include: [ 'id', 'name']
                    }
                },
                {
                    model: Schools,
                    as: 'school'
                }
            ]          
        });

        if (!applicationToSport || applicationToSport.length === 0) {
            return { status: 404, error: "No se encontraron Solicitudes" };
        }

        return { status: 200, applicationToSport };
    } catch (error) {
        console.error("Error en findApplicationToSportByUserIdQuerie:", error);
        throw error;
    }
};
