import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PrimaryHeading, CardScholarship, Button } from "../../components";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";

export default function AllScholarships() {

    useValidAdmin("/user/profile");

    const navigiteTo = useNavigateTo();

    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/sports-availabilities").then((response) => response.json()).then((data) => setScholarships(data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo cargar la información de las becas",
                });
            });
    }, []);

    return (
        <>
            <main className="flex justify-center items-center flex-col gap-4 p-4 max-w-3xl mx-auto space-y-6">
                <Button onClick={() => navigiteTo("/dashboard/scholarship/new")} text={"Nueva beca"} />
                <PrimaryHeading>Todas las becas</PrimaryHeading>

                {scholarships.map((scholarship) => (
                    <CardScholarship key={scholarship.id} scholarship={scholarship} />
                ))}
            </main>
        </>
    );
};