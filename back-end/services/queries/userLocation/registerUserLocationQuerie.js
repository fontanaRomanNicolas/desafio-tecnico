import UserLocation from '../../../models/UserLocationsModel.js';

export const registerUserLocation = async (user_id, locality_id, neighborhood, street, house_number, phone_number, transaction = null) => {
    try {
        const userLocation = await UserLocation.create(
            {
                user_id,
                locality_id,
                neighborhood,
                street,
                house_number,
                phone_number
            },
            { transaction }
        );

        if (!userLocation) {
            return { status: 500, error: 'Error al registrar la ubicación del usuario' };
        }

        return { status: 201, userLocation_id: userLocation.id };
    } catch (error) {
        console.error('Error al registrar la ubicación del usuario:', error);
        throw new Error('Error al registrar la ubicación del usuario');
    }
};