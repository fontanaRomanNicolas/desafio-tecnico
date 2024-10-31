import db from "../config/database.js";
import { findAllPending } from "../services/queries/applicationStatus/findAllPendingQuerie.js";
import { updateApplicationStatus } from "../services/queries/applicationStatus/updateApplicactionStatus.js";
import { findAllApproved } from "../services/queries/applicationStatus/findAllApprovedQuerie.js";
import { findAllReject } from "../services/queries/applicationStatus/findAllRejectQuerie.js";
import { findRejectById } from "../services/queries/applicationStatus/findRejectByIdQuerie.js";
import { updateApplicationStatusRejectQuerie } from "../services/queries/applicationStatus/updateApplicationStatusRejectQuerie.js";

export const getPendingApplications = async (req, res) => {
    try {
        const { status, applicationStatus, error } = await findAllPending();

        if (error) {
            return res.status(status).json({ message: error });
        };

        res.status(status).json(applicationStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateState = async (req, res) => {
    const { state, comment, id } = req.body;

    console.log('body:', req.body);
    const transaction = await db.transaction();

    try {
        const { status, applicationStatus_id, error } = await updateApplicationStatus(state, comment, id, transaction);

        if (error) {
            return res.status(status).json({ message: error });
        };

        res.status(status).json({ message: `Estado de solicitud de deporte fue ${status} con exito` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getApprovedApplications = async (req, res) => {
    try {
        const { status, applicationStatus, error } = await findAllApproved();

        if (error) {
            return res.status(status).json({ message: error });
        };

        res.status(status).json(applicationStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRejectApplications = async (req, res) => {
    try {
        const { status, applicationStatus, error } = await findAllReject();

        if (error) {
            return res.status(status).json({ message: error });
        };

        res.status(status).json(applicationStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRejectById = async (req, res) => {
    const { id } = req.params;

    try {
        const { status, applicationStatus, error } = await findRejectById(id);

        if (error) {
            return res.status(status).json({ message: error });
        };

        res.status(status).json(applicationStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateReject = async (req, res) => {
    const { application_to_sport_id, birthdate, identification_document, user_id } = req.body;
    const { id } = req.params;
    const file = req.file;

    const transaction = await db.transaction();

    try {
        const { status, message, error } = await updateApplicationStatusRejectQuerie(id, application_to_sport_id, birthdate, file, identification_document, user_id, transaction);

        if (error) {
            await transaction.rollback();
            return res.status(status).json({ message: error });
        };

        await transaction.commit();
        res.status(status).json({ message });
    } catch (error) {
        console.error('Error en updateReject:', error);
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};