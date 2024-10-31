import { useUserContext } from '../../Context/UserContext';
import { PrimaryHeading, SubHeading, Button } from '../../components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useNavigateTo from "../../utils/fuctionNavigate";
import useValidUser from "../../utils/validUser";

export default function Profile() {

    useValidUser();

    const { user } = useUserContext();
    const navigateTo = useNavigateTo();

    useEffect(() => {
        if (!user) {
            navigateTo('/user/login');
        }
    }, [user, navigateTo]);

    if (!user) {
        return null;
    }

    const userData = user.user;

    const deleteSession = () => {
        localStorage.removeItem('user');
        navigateTo('/user/login');
    };

    console.log(userData);

    return (
        <main className="flex flex-col justify-center items-center">
            <section className="max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
                <article className="flex flex-col items-center mb-6">
                    <PrimaryHeading>Perfil</PrimaryHeading>
                    <img
                        src={`http://localhost:3000/ftp/image/${userData.photo?.photo}`}
                        alt="Foto de perfil"
                        className="w-full h-max mt-4 object-cover border-2 border-gray-300"
                    />
                </article>

                <article className="mb-6 text-center">
                    <SubHeading size="text-sm">Nombre: {userData.name} {userData.lastname}</SubHeading>
                    <SubHeading size="text-sm">Email: {userData.email}</SubHeading>
                </article>

                <article className="flex justify-center space-x-4 mb-6">
                    <Link
                        to="/user/requests"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Mis solicitudes
                    </Link>
                    <Link
                        to="/user/change-password"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Cambiar contraseña
                    </Link>
                </article>

                <article className="text-center">
                    <Button
                        onClick={deleteSession}
                        bg="bg-red-500"
                        text="Cerrar sesión"
                        className="w-full py-2 mt-4"
                    />
                </article>
            </section>
        </main>
    );
}
