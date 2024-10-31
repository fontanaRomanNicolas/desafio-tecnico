import { findAllEntitiesQuerie } from "../services/queries/entities/findAllEntitiesQuerie.js";
import { findEntityByIdQuerie } from "../services/queries/entities/findEntityByIdQuerie.js";
import { deleteEntityQuerie } from "../services/queries/entities/deleteEntityQuerie.js";
import { updateEntityQuerie } from "../services/queries/entities/updateEntityQuerie.js";
import { createEntityQuerie } from "../services/queries/entities/createEntityQuerie.js";
import { findAllEntitiesWithInactiveQuerie } from "../services/queries/entities/findAllEntitiesWithInactiveQuerie.js";
import db from "../config/database.js";

export const findAllEntities = async (req, res) => {
    try {
        const { status, error, entities } = await findAllEntitiesQuerie();

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(entities);
    } catch (error) {
        console.error('Error al buscar las entidades deportivas:', error);
        return res.status(500).json({ message: 'Error al buscar las entidades deportivas' });
    }
};

export const findEntityById = async (req, res) => {
    const { id } = req.params;
    try {
        const { status, error, entity } = await findEntityByIdQuerie(id);

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(entity);
    } catch (error) {
        console.error('Error al buscar la entidad deportiva:', error);
        return res.status(500).json({ message: 'Error al buscar la entidad deportiva' });
    }
};

export const deleteEntity = async (req, res) => {
    console.log('deleteEntity');

    const transaction = await db.transaction();
    const { id } = req.params;
    try {
        const { status, message, error } = await deleteEntityQuerie(id, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ message: error });
        }

        await transaction.commit();
        return res.status(status).json({ message });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Error al eliminar la entidad deportiva:', error);
        return res.status(500).json({ message: 'Error al eliminar la entidad deportiva' });
    }
};

export const updateEntity = async (req, res) => {
    const transaction = await db.transaction();
    const { id } = req.params;
    const { name, entity_type, phone_number, description } = req.body;
    const file = req.file;

    console.log(req.body)

    try {
        const { status, error, entity_id } = await updateEntityQuerie(id, name, entity_type, phone_number, description, file, transaction);

        if (error) {
            return res.status(status).json({ message: error });
        }

        await transaction.commit();
        return res.status(status).json({ entity_id });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al actualizar la entidad deportiva:', error);
        return res.status(500).json({ message: 'Error al actualizar la entidad deportiva' });
    }

};

export const createEntity = async (req, res) => {
    const transaction = await db.transaction();
    const { name, entity_type, phone_number, description } = req.body;
    const file = req.file;

    try {
        const { status, error, entity_name } = await createEntityQuerie(name, entity_type, phone_number, description, file, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ message: error });
        }

        await transaction.commit();
        return res.status(status).json({ entity_name });

    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear la entidad deportiva:', error);
        return res.status(500).json({ message: 'Error al crear la entidad deportiva' });
    }
};

export const findAllEntitiesWithInactive = async (req, res) => {
    try {
        const { status, error, entities } = await findAllEntitiesWithInactiveQuerie();

        if (error) {
            return res.status(status).json({ message: error });
        };

        return res.status(status).json(entities);
    } catch (error) {
        console.error('Error al buscar las entidades deportivas:', error);
        return res.status(500).json({ message: 'Error al buscar las entidades deportivas' });
    }
};
