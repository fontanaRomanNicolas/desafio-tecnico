import SubHeading from "./SubHeading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export default function CardEntity({ title, entity_id, statu = null }) {
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/scholarships/entity/${entity_id}`);
    };

    const handleEditClick = () => {
        navigate(`/dashboard/sports-entities/edit/${entity_id}`);
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
                const response = await fetch(`http://localhost:3000/api/entities/state/${entity_id}`, {
                    method: 'PUT',
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
                    return;
                }

                Swal.fire('Eliminado!', 'La entidad ha sido eliminada.', 'success');
            } catch (error) {
                console.error("Error en la solicitud de eliminación:", error);
                Swal.fire('Error!', 'No se pudo eliminar la entidad.', 'error');
            }
        }
    };

    return (
        <div className="flex flex-col p-4 bg-white shadow-md rounded-lg mt-4 border transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between items-center mb-2">
                <SubHeading size="text-xs">{title}</SubHeading>
                <Button
                    width="w-24"
                    height="h-6"
                    text="Detalles"
                    padding="p-2"
                    margin="m-0"
                    text_size="text-xs"
                    onClick={handleDetailsClick}
                />
            </div>

            {user && user.user.rol === "admin" && (
                <div className="flex gap-2 justify-between mt-4">
                    {statu === "inactive" ? (
                        <Button
                            width="w-24"
                            height="h-6"
                            text="Inactivo"
                            padding="p-2"
                            margin="m-0"
                            text_size="text-xs"
                            bg="bg-gray-500"
                            disabled
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
                                bg="bg-blue-500 hover:bg-blue-600"
                                onClick={handleEditClick}
                            />
                            <Button
                                width="w-24"
                                height="h-6"
                                text="Eliminar"
                                padding="p-2"
                                margin="m-0"
                                text_size="text-xs"
                                bg="bg-red-500 hover:bg-red-600"
                                onClick={handleDeleteClick}
                            />
                        </>
                    )}
                </div>
            )}
        </div>

    );
}
