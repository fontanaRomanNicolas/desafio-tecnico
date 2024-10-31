import SportsEntitiesModel from '../../../models/SportsEntitiesModel.js';

export const deleteEntityQuerie = async (id, transaction) => {
    try {
        console.log('deleteEntityQuerie');

        const entity = await SportsEntitiesModel.findOne({
            where: { id },
            transaction
        });

        console.log('entity:', entity);

        if (!entity) {
            return { status: 404, error: 'Entidad deportiva no encontrada' };
        }

        const entityUpdated = await entity.update({ state: 'inactive' }, { transaction });

        console.log('entity after save:', entityUpdated);

        return { status: 200, message: 'Entidad deportiva desactivada con éxito', entity };
    } catch (error) {
        console.error('Error al desactivar la entidad deportiva:', error);
        throw new Error('Error al desactivar la entidad deportiva');
    }
};
