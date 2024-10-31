import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { CardSport, Button } from "../../components";
import useNavigateTo from "../../utils/fuctionNavigate";
import useValidAdmin from "../../utils/validAdmin";

export default function AllSports() {

    useValidAdmin("/user/profile");

    const [sports, setSports] = useState([]);

    const navigateTo = useNavigateTo();

    const handleNewSport = () => {
        navigateTo("/dashboard/sports/new");
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/sports/inactive").then((response) => response.json()).then((data) => { setSports(data); })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al cargar los deportes",
                });
            });
    }, []);

    console.log(sports);

    return (
        <>

            <main className="p-4 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
                <section className="flex justify-center items-center mb-4">
                    <Button
                        text="Crear nuevo deporte"
                        onClick={handleNewSport}
                        className="w-full"
                    />
                </section>

                {
                    sports.length === 0 ? (
                        <p>No hay deportes disponibles</p>
                    ) : (
                        sports.map((sport) => (
                            <CardSport key={sport.id} title={sport.name} state={sport.state} type_sport={sport.type_of_sport} vacancy={sport.sports_availabilities[0]?.vacancy_amount} sport_id={sport.id} />
                        ))
                    )
                }
            </main>
        </>
    );
};

