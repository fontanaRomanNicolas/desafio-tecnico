import School from '../../../models/SchoolsModel.js';

export const deleteSchoolQuerie = async (id, transaction) => {
    try {
        const school = await School.findOne({
            where: { id },
            transaction
        });

        if (!school) {
            console.log('Escuela no encontrada.');
            return { status: 404, error: 'Escuela no encontrada' };
        }

        school.state = 'inactive';
        await school.save({ transaction });

        console.log(`Escuela eliminada: ${school.name}`);
        return { status: 200, message: 'Escuela eliminada correctamente' };
    } catch (error) {
        console.log('Error en deleteSchoolQuerie:', error);
        return { status: 500, error: 'Error en el servidor' };
    }
};
