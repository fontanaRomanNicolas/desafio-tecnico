/* eslint-disable react/prop-types */
import SubHeading from "./SubHeading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

export default function CardSchool({ school }) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { id, name, phone_number, address, type_of_school, educational_level, photo } = school;

    const handleEditClick = () => {
        navigate(`/dashboard/school/edit/${id}`);
    };

    const handleDeleteClick = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/api/schools/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                    });
                    navigate("/dashboard/school/all");
                    return;
                }

                Swal.fire(
                    'Eliminado!',
                    'La entidad ha sido eliminada.',
                    'success'
                );

                window.location.reload();
            } catch (error) {
                console.error("Error en la solicitud de eliminación:", error);
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar la entidad.',
                    'error'
                );
            }
        }
    };

    return (
        <article className="flex flex-col p-4 bg-white shadow-md rounded-lg mt-4 border max-w-2xl mx-auto">
            <section>
                <img
                    src={`http://localhost:3000/ftp/image/${photo.photo}`}
                    alt={name}
                    className="w-full h-72 object-cover rounded-md mb-2"
                />
            </section>

            <section>
                <h2 className="text-lg font-bold">{name}</h2>
                <SubHeading size="text-xs">Localidad: {school.locality.name}</SubHeading>
                <p className="text-xs">Teléfono: {phone_number}</p>
                <p className="text-xs">Dirección: {address}</p>
                <p className="text-xs">Tipo de Escuela: {type_of_school === "publica" ? "Pública" : "Privada"}</p>
                <p className="text-xs">Nivel Educativo: {educational_level.charAt(0).toUpperCase() + educational_level.slice(1)}</p>
            </section>

            <section className="flex justify-between items-center mt-2">
                {user && user.user.rol === "admin" && (
                    <section className="flex gap-2 justify-between w-full pt-4 pb-4">
                        {school.state === "inactive" ? (
                            <Button
                                width="w-24"
                                height="h-6"
                                text="Escuela desactivada"
                                padding="p-2"
                                margin="m-0"
                                text_size="text-xs"
                                bg="bg-gray-500" // Puedes elegir el color que prefieras
                                onClick={() => { }}
                            />
                        ) : (
                            <>
                                <Button
                                    width="w-24"
                                    height="h-6"
                                    text="Editar"
                                    padding="p-2"
                                    margin="m-0"
                                    text_size="text-xs"
                                    bg="bg-blue-500"
                                    onClick={handleEditClick}
                                />
                                <Button
                                    width="w-24"
                                    height="h-6"
                                    text="Eliminar"
                                    padding="p-2"
                                    margin="m-0"
                                    text_size="text-xs"
                                    bg="bg-red-500"
                                    onClick={handleDeleteClick}
                                />
                            </>
                        )}
                    </section>
                )}
            </section>
        </article>

    );
}
