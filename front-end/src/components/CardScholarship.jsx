/* eslint-disable react/prop-types */
import SubHeading from "./SubHeading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import useNavigateTo from "../utils/fuctionNavigate";
import Swal from "sweetalert2";

export default function CardScholarship({ scholarship, viewButton = true }) {
    const {
        total_scholarships,
        scholarships_awarded,
        vacancy_amount,
        sport,
        sports_entity
    } = scholarship;

    const navigateTo = useNavigateTo();

    const handleEdit = () => {
        navigateTo(`/dashboard/scholarship/edit/${scholarship.id}`);
    };

    console.log(scholarship);

    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este registro",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:3000/api/sports-availabilities/${scholarship.sports_id}/${scholarship.sports_entity_id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    Swal.fire("Eliminado", "El registro ha sido eliminado", "success");
                    window.location.reload();

                // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo eliminar el registro"
                    });
                }
            }
        });
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md bg-white space-y-6 max-w-lg mx-auto">
            <div className="flex flex-col space-y-2">
                <SubHeading>{sport.name}</SubHeading>
                <Paragraph padding="p-0" margin="mt-1">
                    Tipo de deporte: {sport.type_of_sport}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Historia: {sport.history}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Descripción: {sport.description}
                </Paragraph>
            </div>

            <div className="mt-6 flex flex-col space-y-2">
                <SubHeading>{sports_entity.name}</SubHeading>
                <Paragraph padding="p-0" margin="mt-1">
                    Tipo de entidad: {sports_entity.entity_type}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Teléfono: {sports_entity.phone_number}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Descripción de la entidad: {sports_entity.description}
                </Paragraph>
            </div>

            <div className="mt-6 flex flex-col space-y-2">
                <Paragraph padding="p-0" margin="mt-1">
                    Total de becas: {total_scholarships}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Becas otorgadas: {scholarships_awarded}
                </Paragraph>
                <Paragraph padding="p-0" margin="mt-1">
                    Vacantes disponibles: {vacancy_amount}
                </Paragraph>
            </div>

            {viewButton && (
                <div className="flex justify-end space-x-3 mt-6">
                    <Button onClick={handleEdit} text="EDITAR" />
                    <Button onClick={handleDelete} text="ELIMINAR" bg="bg-red-500" />
                </div>
            )}
        </div>
    );
}
