/* eslint-disable react/prop-types */
import SubHeading from "./SubHeading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import useNavigateTo from "../utils/fuctionNavigate";

export default function CardRequest({ request, index }) {
    const funcionNavegar = useNavigateTo();

    console.log("request", index);

    return (
        <article className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-200 ease-in-out max-w-xl mx-auto">
            <div className="mb-4 mt-4">
                <SubHeading size="text-xs">{`Inscripción a beca deportiva de ${request.sport?.name || "Desconocido"}`}</SubHeading>
                <Paragraph margin="mt-2" padding="p-0">{`Entidad deportiva: ${request.sportsEntity?.name || "No especificada"}`}</Paragraph>
            </div>
            <div className="mb-4">
                <Paragraph margin="m-0" padding="p-0">{`Comentario: ${request.statuses[0]?.comment || "Sin comentarios"}`}</Paragraph>
            </div>
            <div className="mb-4 flex flex-col gap-1 justify-between">
                <span className="text-xs text-gray-600">{`Fecha de inscripción: ${request.statuses[0]?.created_at ? new Date(request.statuses[0].created_at).toLocaleDateString() : "No disponible"}`}</span>
                <span className="text-xs text-gray-600">{`Estado: ${request.statuses[0]?.state || "No especificado"}`}</span>
            </div>
            {request.statuses[0]?.state === "rechazado" && (
                <Button
                    onClick={() => funcionNavegar(`/user/edit-request/${request.id}`)}
                    text="Modificar"
                    bg="bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out"
                />
            )}
        </article>


    );
}
