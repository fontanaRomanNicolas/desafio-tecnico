import db from "../config/database.js";
import { getAllShoolsQuerie } from "../services/queries/schools/getAllShoolsQuerie.js";
import { createSchoolsQuerie } from "../services/queries/schools/createSchoolsQuerie.js";
import { updateSchoolQuerie } from "../services/queries/schools/updateSchoolQuerie.js";
import { getSchoolById } from "../services/queries/schools/getSchoolById.js";
import { deleteSchoolQuerie } from "../services/queries/schools/deleteSchoolQuerie.js";
import { getAllShoolsWithInactiveQuerie } from "../services/queries/schools/getAllSchoolsWithInactiveQuerie.js";
export const getAllShools = async (req, res) => {
    try {

        const { status, schools, error } = await getAllShoolsQuerie();

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(schools);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const createSchool = async (req, res) => {
    const transaction = await db.transaction();

    const { name, locality_id, phone_number, address, type_of_school, educational_level } = req.body;
    const file = req.file;

    try {
        const { status, entity_name, error } = await createSchoolsQuerie(name, locality_id, phone_number, address, type_of_school, educational_level, file, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ error });
        }

        await transaction.commit();
        return res.status(status).json({ entity_name });
    } catch (error) {
        await transaction.rollback();
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
};

export const updateSchool = async (req, res) => {
    const transaction = await db.transaction();
    const { id } = req.params;
    const { name, locality_id, phone_number, address, type_of_school, educational_level } = req.body;
    const file = req.file;

    console.log(req.body);

    try {
        const { status, entity_id, error } = await updateSchoolQuerie(id, name, locality_id, phone_number, address, type_of_school, educational_level, file, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ error });
        }

        await transaction.commit();
        return res.status(status).json({ entity_id });
    } catch (error) {
        await transaction.rollback();
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}

export const getSchool = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, school, error } = await getSchoolById(id);

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(school);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}

export const deleteSchool = async (req, res) => {
    const transaction = await db.transaction();
    const { id } = req.params;

    try {
        const { status, message, error } = await deleteSchoolQuerie(id, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ error });
        }

        await transaction.commit();
        return res.status(status).json({ message });
    } catch (error) {
        await transaction.rollback();
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        return res.status(status).json({ error: message });
    }
}

export const getAllSchoolsWithInactive = async (req, res) => {
    console.log("aca estoy");

    try {
        const { status, schools, error } = await getAllShoolsWithInactiveQuerie();

        if (error) {
            return res.status(status).json({ error });
        }

        return res.status(status).json(schools);
    } catch (error) {
        console.error('Error en getAllSchoolsWithInactive:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
