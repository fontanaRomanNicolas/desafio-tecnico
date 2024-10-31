import SportsEntities from "../../../models/SportsEntitiesModel.js";
import { Op } from "sequelize";
export const findEntityByIdQuerie = async (id) => {
    try {
        const entity = await SportsEntities.findOne({
            where: { id },
            exclude: ['photo_id'],
            include: [
                {
                    association: 'photo',
                    attributes: ['photo']
                },
                {
                    association: 'sports_availabilities',
                    include: [
                        {
                            association: 'sport',
                            attributes: ['id', 'name', 'type_of_sport'],
                        },
                    ],
                    where: { vacancy_amount: { [Op.gt]: 0 } },
                }
            ]
        });

        
        if (!entity) {
            return { status: 404, error: 'Entidad deportiva no encontrada' };
        }

        return { status: 200, entity };

    } catch (error) {
        throw new Error('Error al buscar la entidad deportiva', error);
    }
};