import SportsEntities from "../../../models/SportsEntitiesModel.js";
import { updatePhoto } from "../photo/uploadPhotoQuerie.js";

export const updateEntityQuerie = async (id, name, entity_type, phone_number, description, file, transaction) => {
    try {
        const entity = await SportsEntities.findOne({
            where: { id },
            include: 'photo',
        });

        if (!entity) {
            return { status: 404, error: 'La entidad deportiva no existe' };
        }

        if (!file) {
            entity.name = name;
            entity.entity_type = entity_type;
            entity.phone_number = phone_number;
            entity.description = description;
            await entity.save({ transaction });
            return { status: 200, entity_id: entity.id };
        }

        const existingPhotoId = entity.photo.id;

        const { status: photoStatus, error: photoError, photo_id } = await updatePhoto(file.path, existingPhotoId, 'photo school', transaction);

        if (photoError) {
            return { status: photoStatus, error: photoError };
        }

        entity.name = name;
        entity.entity_type = entity_type;
        entity.phone_number = phone_number;
        entity.description = description;

        await entity.save({ transaction });

        return { status: 200, entity_id: entity.id };
    } catch (error) {
        await transaction.rollback();
        console.error('Error al actualizar la entidad deportiva:', error);
        throw new Error('Error al actualizar la entidad deportiva');
    }
};
