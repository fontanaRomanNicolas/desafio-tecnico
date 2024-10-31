import School from '../../../models/SchoolsModel.js';
import { registerPhoto } from "../photo/uploadPhotoQuerie.js";

export const createSchoolsQuerie = async (name, locality_id, phone_number, address, type_of_school, educational_level, file, transaction) => {
        try{
            const school = await School.findOne({
                where: { name },
            });

            if (school) {
                return { status: 409, error: 'La escuela ya existe' };
            }

            if (!file) {
                return { status: 400, error: 'El archivo de foto es obligatorio' };
            }
        
            const { status: photoStatus, error: photoError, photo_id } = await registerPhoto(file.path, 'photo school', transaction);
            if (photoError) {
                return { status: photoStatus, error: photoError };
            }

            const newSchool = await School.create(
                {
                    name,
                    locality_id,
                    phone_number,
                    address,
                    type_of_school,
                    educational_level,
                    photo_id,
                    state: "active"
                },
                { transaction }
            );

            return { status: 201, entity_name:  newSchool.name };
        }catch(error){
            console.log(error);
            return { status: 500, error: 'Error al crear la escuela' };
        }
};