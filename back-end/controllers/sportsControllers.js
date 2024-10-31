import { findSportByIdQuerie } from "../services/queries/sports/findSportByIdQuerie.js";
import { createSportQuerie } from "../services/queries/sports/createSportQuerie.js";
import { updateSportQuerie } from "../services/queries/sports/updateSportQuerie.js";
import { findAllSportQuerie } from "../services/queries/sports/findAllSportQuerie.js";
import { deleteSportQuerie } from "../services/queries/sports/deleteSportQuerie.js";
import { findAllWhitInactiveSportQuerie } from "../services/queries/sports/findAllSportWithInactiveQuerie.js";

export const findSportById = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, sport, error } = await findSportByIdQuerie(id);

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(sport);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const createSport = async (req, res) => {
    const { name, type_of_sport, description, history } = req.body;

    console.log(req.body);

    try {
        const { status, newSport, error } = await createSportQuerie(name, type_of_sport, description, history);

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(newSport);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const updateSport = async (req, res) => {
    const { id } = req.params;
    const { name, type_of_sport, description, history } = req.body;

    console.log(req.body);
    console.log(req.params);

    try {
        const { status, newSport, error } = await updateSportQuerie(id, name, type_of_sport, description, history);

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(newSport);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const findAllSport = async (req, res) => {
    try {
        const { status, sports, error } = await findAllSportQuerie();

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(sports);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteSport = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, message, error } = await deleteSportQuerie(id);

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json({ message });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const findAllWhitInactiveSport = async (req, res) => {
    try {
        const { status, sports, error } = await findAllWhitInactiveSportQuerie();

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(sports);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};