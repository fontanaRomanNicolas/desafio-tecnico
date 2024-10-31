import { PrimaryHeading, Paragraph, CardEntity } from "../../components";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Scholarships() {

    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/entities')
            .then((response) => {
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                    });
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('Los datos no son un array');
                }
                setEntities(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                });
            });
    }, []);

    return (
        <>
            <main className="container mx-auto px-4">
                <article className="max-w-3xl mx-auto">
                    <PrimaryHeading>Entidades deportivas</PrimaryHeading>
                    <div>
                        <Paragraph padding="pr-4" margin="mt-4">
                            Aquí podrás visualizar las entidades deportivas con vacantes para becas. Además, podrás saber los detalles de la entidad y los deportes que ofrecen, pudiendo ver los cupos y descripción del deporte de tu interés.
                        </Paragraph>
                    </div>
                </article>
                <article className="flex flex-col gap-8 mt-6 max-w-3xl mx-auto">
                    {entities.length === 0 ? (
                        <Paragraph className="text-center">¡No hay entidades disponibles!</Paragraph>
                    ) : (
                        entities.map((entity) => (
                            <CardEntity key={entity.id} title={entity.name} entity_id={entity.id} />
                        ))
                    )}
                </article>
            </main>
        </>
    );
}
