import { getAllSportsAvailabilitiesQuerie } from "../services/queries/SportsAvailabilities/getAllSportsAvailabilitiesQuerie.js";
import { getSportsAvailabilitiesByEntityQuerie } from "../services/queries/SportsAvailabilities/getAllSportsAvailabilitiesByEntityQuerie.js";
import { getSportsAvailabilitiesByIdQuerie } from "../services/queries/SportsAvailabilities/getSportsAvailabilitiesByIdQuerie.js";
import { updateSportsAvailabilitiesQuerie } from "../services/queries/SportsAvailabilities/updateSportsAvailabilitiesQuerie.js";
import { createSportsAvailabilitiesQuerie } from "../services/queries/SportsAvailabilities/createSportsAvailabilitiesQuerie.js";
import { deleteSportsAvailabilitiesQuerie } from "../services/queries/SportsAvailabilities/deleteSportsAvailabilitiesQuerie.js";

export const getAllSportsAvailabilities = async (req, res) => {
    try {
        const { status, sportsAvailabilities, error } = await getAllSportsAvailabilitiesQuerie();

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(sportsAvailabilities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const getSportsAvailabilitiesByEntity = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, sportsAvailabilities, error } = await getSportsAvailabilitiesByEntityQuerie(id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(sportsAvailabilities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const getSportsAvailabilitiesById = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, sportsAvailabilities, error } = await getSportsAvailabilitiesByIdQuerie(id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(sportsAvailabilities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const updateSportsAvailabilities = async (req, res) => {
    const { sports_id, sports_entity_id, total_scholarships, scholarships_awarded, vacancy_amount } = req.body;

    console.log(req.body)

    try {
        const { status, sportsAvailabilities, error } = await updateSportsAvailabilitiesQuerie(sports_id, sports_entity_id, total_scholarships, scholarships_awarded, vacancy_amount);

        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json(sportsAvailabilities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const createSportsAvailabilities = async (req, res) => {

    console.log(req.body)

    const { sports_id, sports_entity_id, total_scholarships } = req.body;

    try {
        const { status, sportsAvailabilities, error } = await createSportsAvailabilitiesQuerie(sports_id.value, sports_entity_id.value, total_scholarships);


        if (error) {
            return res.status(status).json({ message: error });
        }

        return res.status(status).json(sportsAvailabilities);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};

export const deleteSportsAvailabilities = async (req, res) => {
    const { sports_id, sports_entity_id } = req.params;

    try {
        const { status, sportsAvailabilities, error } = await deleteSportsAvailabilitiesQuerie(sports_id, sports_entity_id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(sportsAvailabilities);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};