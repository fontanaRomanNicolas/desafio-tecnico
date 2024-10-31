import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryHeading, SubHeading, Paragraph, CardSport } from "../../components";

export default function EntitySport() {
    const { id } = useParams();
    const [entitySport, setEntitySport] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/entities/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta de la red");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.photo.photo);
                setEntitySport(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("No se pudo cargar la información de la entidad deportiva.");
            });
    }, [id]);

    if (error) {
        return <Paragraph>{error}</Paragraph>;
    }

    if (!entitySport) {
        return <Paragraph>Cargando...</Paragraph>;
    }

    console.log(entitySport.photo?.photo);

    return (
        <>
            <main className="flex flex-col items-center w-full md:px-4 lg:max-w-5xl mx-auto">
                <article className="flex flex-col items-center w-full md:w-3/4 lg:w-2/3 text-center">
                    <PrimaryHeading>{entitySport.name}</PrimaryHeading>
                    <img
                        src={`http://localhost:3000/ftp/image/${entitySport.photo?.photo}`}
                        alt={entitySport.name}
                        className="mt-4 rounded-lg w-full h-auto max-w-full"
                    />
                </article>

                <article className="flex flex-col items-start mt-6 w-full md:w-3/4 lg:w-2/3">
                    <SubHeading margin="mt-4">Tipo de entidad: {entitySport.entity_type}</SubHeading>
                    <Paragraph padding="p-0 mt-4">Número telefónico: {entitySport.phone_number}</Paragraph>
                    <Paragraph padding="p-0 mt-4">{entitySport.description}</Paragraph>
                    <div className="w-full mt-8">
                        <SubHeading margin="text-left">Deportes con cupo</SubHeading>
                    </div>
                </article>
                <article className="flex flex-wrap md:justify-start gap-4 mt-4 w-full md:w-3/4 lg:w-2/3">
                    {entitySport.sports_availabilities.map((sportAvailability) => (
                        <CardSport
                            key={sportAvailability.sport.id}
                            title={sportAvailability.sport.name}
                            type_sport={sportAvailability.sport.type_of_sport}
                            vacancy={sportAvailability.vacancy_amount}
                            sport_id={sportAvailability.sport.id}
                        />
                    ))}
                </article>
            </main>

        </>
    );
}
