/* eslint-disable react/prop-types */
import SubHeading from "./SubHeading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import useNavigateTo from "../utils/fuctionNavigate";
import { useUserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

export default function CardSport({ title, type_sport, vacancy, sport_id, state = null }) {

    const { user } = useUserContext();

    const navigate = useNavigateTo();

    const handleClick = () => {
        navigate(`/dashboard/sports/detail/${sport_id}`);
    };

    const handleEditClick = () => {
        navigate(`/dashboard/sports/edit/${sport_id}`);
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
                const response = await fetch(`http://localhost:3000/api/sports/delete/${sport_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user ? user.token : ""}`,
                    },
                });

                const result = await response.json();

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.message ? result.message : '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                    });
                    return;
                }

                Swal.fire(
                    'Eliminado!',
                    'El deporte ha sido eliminado.',
                    'success'
                );

                window.location.reload();

            } catch (error) {
                console.error("Error en la solicitud de eliminación:", error);
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el deporte.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white flex flex-col justify-between w-full sm:w-80 md:w-auto space-y-4">
            <div className="flex flex-col space-y-4">
                <div>
                    <SubHeading>{title}</SubHeading>
                    <Paragraph padding="p-0" margin="mt-2">
                        Tipo de deporte: {type_sport}
                    </Paragraph>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 space-y-4 sm:space-y-0">
                    <Paragraph padding="p-0">Cupos disponibles: {vacancy ? vacancy : "0"}</Paragraph>
                    <Button
                        onClick={handleClick}
                        width="w-full sm:w-24"
                        height="h-8 sm:h-6"
                        text="Detalles"
                        padding="p-2"
                        margin="m-0"
                        text_size="text-xs"
                    />
                </div>
            </div>
            {user && user.user.rol === "admin" && (
                <div className="flex gap-2 justify-end mt-4 sm:mt-8">
                    {state === "inactive" ? (
                        <Button
                            width="w-34"
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
                                width="w-full sm:w-24"
                                height="h-8 sm:h-6"
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
                </div>
            )}
        </div>

    );
}
