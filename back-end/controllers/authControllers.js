import { loginQuerie } from "../services/queries/auth/loginQuerie.js";

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const { status, user, token, error } = await loginQuerie(email, password);

        if (error) {
            console.log(error, "error")
            return res.status(status).json({ message: error, user:"holaaaaaaaaaaaa" });
        }

        return res.status(status).json({ user: { user, token } });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};