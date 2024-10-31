import Province from '../../../models/ProvincesModel.js';

export const createProvinceQuerie = async (name) => {
    try {
        const province = await Province.findOne({ where: { name } });

        if (province) {
            return { status: 400, error: 'La provincia ya existe' };
        };

        const newProvince = await Province.create({ name });

        return { status: 201, newProvince };
    } catch (error) {
        throw new Error('Error creating province: ' + error.message);
    }
};