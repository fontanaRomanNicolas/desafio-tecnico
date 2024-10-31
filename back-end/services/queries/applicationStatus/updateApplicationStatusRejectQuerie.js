import ApplicationStatus from "../../../models/ApplicationStatusesModel.js";
import User from '../../../models/UsersModel.js';
import ApplicationToSports from "../../../models/ApplicationToSportsModel.js";
import { updatePhoto } from "../photo/uploadPhotoQuerie.js";

export const updateApplicationStatusRejectQuerie = async (id, application_to_sport_id, birthdate, file, identification_document, user_id, transaction) => {
    try {
        const applicationToSport = await ApplicationToSports.findOne({
            where: { id: application_to_sport_id },
            transaction
        });

        if (!applicationToSport) {
            return { status: 404, message: 'No se encontró la solicitud de deporte.' };
        }

        const user = await User.findOne({
            where: { id: user_id },
            transaction
        });

        if (!user) {
            return { status: 404, message: 'No se encontró el usuario.' };
        }

        const applicationStatus = await ApplicationStatus.findOne({
            where: { id, state: 'rechazado' },
            transaction
        });

        if (!applicationStatus) {
            return { status: 404, message: 'No se encontró la solicitud rechazada.' };
        }

        if (identification_document && identification_document !== user.identification_document) {
            console.log("entre en identification_document")
            user.identification_document = identification_document;
            await user.save({ transaction });
        }

        if (birthdate && birthdate !== applicationToSport.birthdate) {
            console.log("entre en birthdate")
            applicationToSport.birthdate = birthdate;
            await applicationToSport.save({ transaction });
        }

        if (file) {
            console.log("entre en file")
            const { status: photoStatus, error: photoError, photo_id } = await updatePhoto(file.path, user.photo_id, 'photo of the document', transaction);
            if (photoError) {
                return { status: photoStatus, message: photoError };
            }

            user.photo_id = photo_id;
            await user.save({ transaction });
        }

        applicationStatus.comment = 'Modificaciones realizadas, pendiente de revisión.';
        applicationStatus.state = 'pendiente';
        await applicationStatus.save({ transaction });

        return { status: 200, message: 'Solicitud y datos actualizados con éxito.' };

    } catch (error) {
        console.error('Error en updateApplicationStatusRejectQuerie:', error);
        return { status: 500, message: 'Error interno al actualizar la solicitud.' };
    }
};
