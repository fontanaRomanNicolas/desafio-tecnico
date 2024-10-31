import { useUserContext } from "../Context/UserContext";
import useNavigateTo from './fuctionNavigate';
import { useEffect } from "react";

const useValidUser = () => {
    const { user } = useUserContext();
    const navigate = useNavigateTo();

    useEffect(() => {
        if (!user) {
            navigate('/user/login');
            return;
        }

        if (user.user.rol !== "user") {
            navigate('/dashboard');
        }
    }, [user, navigate]);
};

export default useValidUser;
