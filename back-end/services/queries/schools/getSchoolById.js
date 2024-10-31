import School from '../../../models/SchoolsModel.js';

export const getSchoolById = async (id) => {
    try {
        const school = await School.findOne({
            where: { id },
            include: [
                {
                    association: 'locality',
                    attributes: ['id', 'name'],
                },
                {
                    association: 'photo',
                },
            ],
        });

        if (!school) {
            return { status: 404, error: 'La escuela no existe' };
        }

        return { status: 200, school };
    } catch (error) {
        console.log(error);
        return { status: 500, error: 'Error al obtener la escuela' };
    }
};