import { useUserContext } from "../Context/UserContext";
import useNavigateTo from './fuctionNavigate';
import { useEffect } from "react";

const useValidAdmin = (redirectPath) => {
    const { user } = useUserContext();
    const navigate = useNavigateTo();

    useEffect(() => {
        if (!user) {
            navigate('/user/login');
            return;
        }

        if (user.user.rol !== "admin") {
            navigate(redirectPath);
        }
    }, [user, navigate, redirectPath]);
};

export default useValidAdmin;
