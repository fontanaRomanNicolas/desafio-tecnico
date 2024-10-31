import { updatePhoto } from "../photo/uploadPhotoQuerie.js";
import School from '../../../models/SchoolsModel.js';

export const updateSchoolQuerie = async (id, name, locality_id, phone_number, address, type_of_school, educational_level, file, transaction) => {
    try{
        const school = await School.findOne({
            where: { id },
            include: 'photo',
        });

        if (!school) {
            return { status: 404, error: 'La escuela no existe' };
        }

        if (!file) {
            school.name = name;
            school.locality_id = locality_id;
            school.phone_number = phone_number;
            school.address = address;
            school.type_of_school = type_of_school;
            school.educational_level = educational_level;
            await school.save({ transaction });
            return { status: 200, entity_id: school.id };
        }

        const existingPhotoId = school.photo.id;

        const { status: photoStatus, error: photoError, photo_id } = await updatePhoto(file.path, existingPhotoId, 'photo school', transaction);

        if (photoError) {
            return { status: photoStatus, error: photoError };
        }

        school.name = name;
        school.locality_id = locality_id
        school.phone_number = phone_number;
        school.address = address;
        school.type_of_school = type_of_school;
        school.educational_level = educational_level;
        await school.save({ transaction });

        return { status: 200, entity_id: school.id };

    }catch(error){
        console.log(error);
        return { status: 500, error: 'Error al actualizar la escuela' };
    }
};