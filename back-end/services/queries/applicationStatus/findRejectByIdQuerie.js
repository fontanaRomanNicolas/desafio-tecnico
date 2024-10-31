import ApplicationStatus from "../../../models/ApplicationStatusesModel.js";
import User from '../../../models/UsersModel.js';
import SportsEntities from '../../../models/SportsEntitiesModel.js';
import Sports from '../../../models/SportsModel.js';
import Schools from '../../../models/SchoolsModel.js';


export const findRejectById = async (id) => {
    try {

        const applicationStatus = await ApplicationStatus.findOne({
            where: {
                id,
                state: 'rechazado'
            },
            include: {
                association: 'application',
                attributes: {
                    include: ['id', 'birthdate']
                },
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
                            include: ['id', 'name']
                        }
                    },
                    {
                        model: Sports,
                        as: 'sport',
                        attributes: {
                            include: ['id', 'name']
                        }
                    },
                    {
                        model: Schools,
                        as: 'school'
                    }
                ]
            }
        });

        if (!applicationStatus) {
            return { status: 404, message: 'No se encontraron la solicitud rechazada' };
        }

        return { status: 200, applicationStatus };

    } catch (error) {
        throw new Error('Error al obtener la solicitud rechazada');
    }
};