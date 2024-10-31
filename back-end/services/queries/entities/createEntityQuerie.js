import SportsEntities from "../../../models/SportsEntitiesModel.js";
import { registerPhoto } from "../photo/uploadPhotoQuerie.js";

export const createEntityQuerie = async (name, entity_type, phone_number, description, file, transaction) => {
    try{
        const existingEntity = await SportsEntities.findOne({
            where: { name },
        });
    
        if (existingEntity) {
            return { status: 409, error: 'La entidad deportiva ya existe' };
        }
    
        if (!file) {
            return { status: 400, error: 'El archivo de foto es obligatorio' };
        }
    
        const { status: photoStatus, error: photoError, photo_id } = await registerPhoto(file.path, 'photo school', transaction);
        if (photoError) {
            return { status: photoStatus, error: photoError };
        }
    
        const newEntity = await SportsEntities.create(
            {
                name,
                entity_type,
                phone_number,
                photo_id,
                description,
                state: 'active',
            },
            { transaction }
        );
    
        return { status: 201, entity_name: newEntity.name };
    }catch(error){
        console.log(error);
        return { status: 500, error: 'Error al crear la entidad deportiva' };
    }
};