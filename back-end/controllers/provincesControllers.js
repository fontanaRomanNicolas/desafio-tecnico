import { getAllProvincesQuerie } from "../services/queries/provinces/getAllProvincesQuerie.js";
import { createProvinceQuerie } from "../services/queries/provinces/createProvinceQuerie.js";
import { updateProvinceQuerie } from "../services/queries/provinces/updateProvinceQuerie.js";

export const getAllProvinces = async (req, res) => {
    try {

        const { status, provinces, error } = await getAllProvincesQuerie();

        if (error) {
            return res.status(status).json({ error });
        }
        
        return res.status(status).json(provinces);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}

export const createProvince = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const { status, newProvince, error } = await createProvinceQuerie(name);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(newProvince);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}

export const updateProvince = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const { status, province, error } = await updateProvinceQuerie(id, name);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(province);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}