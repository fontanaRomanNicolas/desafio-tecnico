import ApplicationStatus from '../../../models/ApplicationStatusesModel.js';
import User from '../../../models/UsersModel.js';
import SportsEntities from '../../../models/SportsEntitiesModel.js';
import Sports from '../../../models/SportsModel.js';
import Schools from '../../../models/SchoolsModel.js';
export const findAllPending = async () => {
    try{

        const applicationStatus = await ApplicationStatus.findAll({
            where: {
                state: 'Pendiente'
            },
            include: {
                association: 'application',
                include: [
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
            }
        });

        if (!applicationStatus || applicationStatus.length === 0) {
            return { status: 500, error: 'Error al obtener los estados de las solicitudes de deporte' };
        }

        return { status: 200, applicationStatus };

    }catch(error){

        console.error('Error al obtener los estados de las solicitudes de deporte:', error);
        throw new Error('Error al obtener los estados de las solicitudes de deporte');

    }
};