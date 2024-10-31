import { useState, useEffect } from "react";
import { CardEntity, Paragraph, Button } from "../../components";
import useNavigateTo from "../../utils/fuctionNavigate";
import Swal from "sweetalert2";
import useValidAdmin from "../../utils/validAdmin";

export default function AllSportsEntities() {

    useValidAdmin("/user/profile");

    const [entities, setEntities] = useState([]);

    const navigateTo = useNavigateTo();

    const handleNewEntity = () => {
        navigateTo('/dashboard/sports-entities/new');
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/entities/inactive')
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

    console.log(entities);


    return (
        <>
            <main className="p-4 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
                <section className="flex justify-center items-center mb-4">
                    <Button
                        text="Crear entidad deportiva"
                        onClick={handleNewEntity}
                        className="w-full"
                    />
                </section>

                {entities.length === 0 ? (
                    <Paragraph>¡No hay entidades disponibles!</Paragraph>
                ) : (
                    entities.map((entity) => (
                        <CardEntity key={entity.id} title={entity.name} entity_id={entity.id} statu={entity.state}/>
                    ))
                )}
            </main>
        </>
    );
}; 