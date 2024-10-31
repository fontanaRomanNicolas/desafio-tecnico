import Province from '../../../models/ProvincesModel.js';

export const updateProvinceQuerie = async (id, name) => {
    try {
        const province = await Province.findByPk(id);

        if (!province) {
            return { status: 404, error: 'No se encontró la provincia' };
        }

        province.name = name;
        await province.save();

        return { status: 200, province };
    } catch (error) {
        throw new Error('Error updating province: ' + error.message);
    }
};