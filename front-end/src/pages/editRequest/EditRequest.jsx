import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useNavigateTo from "../../utils/fuctionNavigate";
import { Button, Input, SubHeading } from "../../components";
import { useImagePreview } from "../../hooks/useImagePreview";
import Swal from "sweetalert2";

export default function EditRequest() {
    const { imagePreview, handleImageChange } = useImagePreview();
    const { id } = useParams();
    const navigateTo = useNavigateTo();
    const [request, setRequest] = useState(null);

    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
        defaultValues: {
            identification_document: '',
            birthdate: '',
            user_id: '',
            application_to_sport_id: ''
        }
    });

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch(`http://localhost:3000/api/application-statuses/reject/${id}`);

            if (!response.ok) {
                console.error('Error fetching request:', response);
                return;
            }

            const result = await response.json();
            setRequest(result);

            setValue("identification_document", result.application?.user?.identification_document);
            setValue("birthdate", result.application?.birthdate);
            setValue("user_id", result.application?.user_id);
            setValue("application_to_sport_id", result.application_to_sport_id);
        };

        fetchRequest();
    }, [id, setValue]);

    console.log(request);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {

        console.log(data);

        const formData = new FormData();
        formData.append('identification_document', data.identification_document);
        formData.append('birthdate', data.birthdate);
        formData.append('user_id', data.user_id);
        formData.append('application_to_sport_id', data.application_to_sport_id);

        if (data.dni_image && data.dni_image[0]) {
            formData.append('dni_image', data.dni_image[0]);
        }

        const response = await fetch(`http://localhost:3000/api/application-statuses/reject/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok || response.status === 201) {
            Swal.fire({
                title: "Solicitud actualizada con éxito",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigateTo('/user/requests');
        } else {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar la solicitud",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            navigateTo('/user/requests');
        }
    };

    return (
        <main className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-md">
                <section>
                    <SubHeading size="text-lg" margin="mb-4">
                        Edicion de solicitud rechazada
                    </SubHeading>
                    <SubHeading size="text-lg">
                        Datos a modificar: {request ? request.comment : ""}
                    </SubHeading>
                    <Input
                        icon="/document.svg"
                        textLabel="DNI"
                        type="number"
                        name="identification_document"
                        placeholder="Ingrese su DNI"
                        register={register}
                        validation={{
                            maxLength: { value: 8, message: 'Tu DNI no puede contener más de 8 caracteres' },
                            minLength: { value: 7, message: 'Tu DNI debe tener al menos 7 caracteres' },
                            pattern: { value: /^[0-9]+$/i, message: 'Tu DNI solo puede contener números' }
                        }}
                        error={errors.identification_document?.message}
                        className="mt-4"
                    />

                    <Input
                        icon="/calendar.svg"
                        textLabel="Fecha de Nacimiento"
                        type="date"
                        name="birthdate"
                        placeholder="Ingrese su Fecha de Nacimiento"
                        register={register}
                        className="mt-4"
                    />

                    {/* Campos ocultos para user_id y application_to_sport_id */}
                    <input type="hidden" {...register("user_id")} />
                    <input type="hidden" {...register("application_to_sport_id")} />

                    <section>
                        <SubHeading>Foto del documento</SubHeading>
                        <Input
                            textLabel={"Foto del DNI"}
                            type={"file"}
                            id={"dni_image"}
                            name={"dni_image"}
                            register={register}
                            onChange={handleImageChange}
                            className="mt-4"
                        />

                        {imagePreview && (
                            <div className="image-preview mt-4">
                                <img src={imagePreview} alt="Previsualización de la imagen" className="w-full h-auto rounded-md shadow-sm" />
                            </div>
                        )}
                    </section>
                </section>

                <Button text="Enviar" icon="/addus.svg" className="mt-6" />
            </form>
        </main>
    );
}
