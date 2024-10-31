import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CardSchool, Button } from "../../components";
import useNavigateTo from "../../utils/fuctionNavigate";
import useValidAdmin from "../../utils/validAdmin";

export default function AllSchools() {

    useValidAdmin("/user/profile");

    const [schools, setSchools] = useState([]);

    const navigateTo = useNavigateTo();

    const handleCreateClick = () => {
        navigateTo("/dashboard/school/new");
    };

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/schools/inactive");

                const data = await response.json();

                setSchools(data);
            } catch (error) {
                console.error("Error fetching schools:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                });
            }
        };

        fetchSchools();
    }, []);

    console.log(schools);

    return (
        <main className="p-4 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
            <section className="flex justify-center items-center mb-4">
                <div className="flex-grow max-w-2xl">
                    <Button
                        text="Crear escuela"
                        onClick={handleCreateClick}
                        className="w-full"
                    />
                </div>
            </section>
            <section>
                {schools.length > 0 ? (
                    schools.map((school) => (
                        <CardSchool
                            key={school.id}
                            school={school}
                            className="w-full"
                        />
                    ))
                ) : (
                    <p className="text-center">No hay escuelas registradas.</p>
                )}
            </section>
        </main>

    );
};