import { getAllLocalitiesQuerie } from "../services/queries/localities/getAllLocalitiesQuerie.js";
import { createLocalityQuerie } from "../services/queries/localities/createLocalityQuerie.js";
import { updateLocalityQuerie } from "../services/queries/localities/updateLocalityQuerie.js";
import { deleteLocalityQuerie } from "../services/queries/localities/deleteLocalityQuerie.js";
import { getAllLocalitiesWhitInactiveQuerie } from "../services/queries/localities/getAllLocalitiesWhitInactiveQuerie.js";

export const getAllLocalities = async (req, res) => {
    try {
        const { status, localities, error } = await getAllLocalitiesQuerie();

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(localities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const createLocality = async (req, res) => {
    try {
        const { name, province_id } = req.body;
        const { status, locality, error } = await createLocalityQuerie(name, province_id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(locality);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const updateLocality = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, province_id } = req.body;
        const { status, locality, error } = await updateLocalityQuerie(id, name, province_id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(locality);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const deleteLocality = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, locality, error } = await deleteLocalityQuerie(id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(locality);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const getAllLocalitiesWhitInactive = async (req, res) => {
    try {
        const { status, localities, error } = await getAllLocalitiesWhitInactiveQuerie();

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(localities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}