import SportsEntities from "../../../models/SportsEntitiesModel.js";

export const findAllEntitiesQuerie = async () => {
    try {
        const entities = await SportsEntities.findAll({
            where: {state: 'active'},
            attributes: ['id', 'name']
        });

        if(!entities || entities.length === 0) {
            return {status: 404, error: 'No se encontraron entidades deportivas'};
        }

        return {status: 200, entities};
    }catch(error) {
        throw new Error('Error al buscar las entidades deportivas', error);
    }
};