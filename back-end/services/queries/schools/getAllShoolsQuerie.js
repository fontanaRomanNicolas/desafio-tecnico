import School from '../../../models/SchoolsModel.js';

export const getAllShoolsQuerie = async () => {
    try {
        const schools = await School.findAll({
            where: { state: 'active' },
            include: [
                {
                    association: 'locality',
                    attributes: ['id', 'name']
                },
                {
                    association: 'photo',
                    attributes: ['photo']
                }
            ]
        });

        if (!schools || schools.length === 0) {
            throw { status: 404, error: 'No se encontraron escuelas' };
        }

        return { status: 200, schools };
    } catch (error) {
        throw new Error('Error finding all schools: ' + error.message);
    }
};