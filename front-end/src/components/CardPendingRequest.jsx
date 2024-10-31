/* eslint-disable react/prop-types */
import SubHeading from "./SubHeading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import Input from "./Input";

export default function CardRequestPending({ request, register, onSubmit, onReject, handleSubmit }) {

    const isEditable = register && onSubmit && onReject && handleSubmit;

    return (
        <article className="bg-white shadow-lg rounded-lg p-6 mb-6 border max-w-lg mx-auto">
            <section className="mb-4 mt-4">
                <img
                    src={`http://localhost:3000/ftp/image/${request.application.user?.photo?.photo}`}
                    alt={`imagen ${request.id}`}
                    className="w-full h-auto rounded-lg"
                />
            </section>
            <section className="mb-4 mt-4">
                <SubHeading size="text-xs">{`Inscripción a beca deportiva de ${request.application.sport?.name || "Desconocido"}`}</SubHeading>
                <Paragraph margin="mt-4" padding="p-0">{`Entidad deportiva: ${request.application.sportsEntity?.name || "No especificada"}`}</Paragraph>
            </section>
            <section className="mb-4">
                <Paragraph margin="m-0" padding="p-0">{`Comentario: ${request.comment || "Sin comentarios"}`}</Paragraph>
            </section>
            <section className="mb-4 flex flex-col gap-2">
                <span className="text-xs">{`Fecha de inscripción: ${request.created_at ? new Date(request.created_at).toLocaleDateString() : "No disponible"}`}</span>
                <span className="text-xs">{`Estado: ${request.state || "No especificado"}`}</span>
            </section>
            <section className="mb-4 flex flex-col justify-start items-start gap-2">
                <Paragraph margin="m-0" padding="p-0">{`Nombre del usuario: ${request.application.user?.name || "No disponible"} ${request.application.user?.lastname || ""}`}</Paragraph>
                <Paragraph margin="m-0" padding="p-0">{`Documento de identificación: ${request.application.user?.identification_document || "No disponible"}`}</Paragraph>
                <span className="text-xs">{`Fecha de nacimiento: ${request.application.birthdate ? new Date(request.application.birthdate).toLocaleDateString() : "No disponible"}`}</span>
                <span className="text-xs">{`Escuela: ${request.application.school?.name || "No especificada"}`}</span>
                <span className="text-xs">{`Teléfono de la entidad: ${request.application.sportsEntity?.phone_number || "No disponible"}`}</span>
            </section>

            {isEditable && (
                <>
                    <section className="mb-4">
                        <Input
                            icon=""
                            textLabel="Comentario (opcional)"
                            type="text"
                            name="adminComment"
                            id="adminComment"
                            placeholder="Ingrese su comentario aquí"
                            register={register}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </section>
                    <section className="flex justify-between">
                        <Button
                            onClick={handleSubmit((data) => onSubmit(data, request.id, 'aprobado'))}
                            bg="bg-verde-custom"
                            text="APROBAR"
                            text_size="text-xs"
                            width="w-24"
                            height="h-8"
                            className="shadow-md rounded"
                        >
                            Aprobar
                        </Button>
                        <Button
                            onClick={handleSubmit((data) => onReject(data, request.id, 'rechazado'))}
                            bg="bg-red-500"
                            text="RECHAZAR"
                            text_size="text-xs"
                            width="w-24"
                            height="h-8"
                            className="shadow-md rounded"
                        >
                            Rechazar
                        </Button>
                    </section>
                </>
            )}
        </article>

    );
}
