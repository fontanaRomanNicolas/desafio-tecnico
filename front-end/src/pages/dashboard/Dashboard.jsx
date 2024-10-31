import { PrimaryHeading, CircleButton, Button } from "../../components";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";
export default function Dashboard() {

    useValidAdmin("/user/profile");

    const navigateTo = useNavigateTo();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigateTo("/user/login");
    };

    return (
        <main className="p-4">
            <PrimaryHeading>Dashboard</PrimaryHeading>
            <article className="flex justify-center gap-4 flex-wrap items-start w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"BECAS APROBADAS"} rutaIcon={"/file-ap.svg"} path={"/dashboard/scholarships/approved"} />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"BECAS RECHAZADAS"} rutaIcon={"/file-cancel.svg"} path={"/dashboard/scholarships/reject"} bg="bg-red-500" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"BECAS PENDIENTE"} rutaIcon={"/file-clock.svg"} path={"/dashboard/scholarships/pending"} bg="bg-gray-500" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"PROVINCIAS"} rutaIcon={"/province.svg"} path={"/dashboard"} bg="bg-province" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"LOCALIDADES"} rutaIcon={"/location.svg"} path={"/dashboard"} bg="bg-locality" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"ESCUELAS"} rutaIcon={"/school.svg"} path={"/dashboard/school/all"} bg="bg-school" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"ENTIDADES DEPORTIVAS"} rutaIcon={"/entitysport.svg"} path={"/dashboard/sports-entities/all"} bg="bg-sportsEntity" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"DEPORTES"} rutaIcon={"/sport.svg"} path={"/dashboard/sports/all"} bg="bg-sport" />
                </section>
                <section className="flex justify-center items-center p-2 rounded-lg shadow-md w-48 h-48">
                    <CircleButton text={"NUEVAS BECAS"} rutaIcon={"/file-clock.svg"} path={"/dashboard/scholarship"} bg="bg-scholarship" />
                </section>
            </article>
            <Button text={"Cerrar Sesión"} onClick={handleLogout} bg="bg-red-500"/>
        </main>

    );
};