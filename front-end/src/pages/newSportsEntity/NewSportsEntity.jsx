import Swal from "sweetalert2";
// import useNavigate from "../../utils/fuctionNavigate";
import { PrimaryHeading, SubHeading, Input, Button, CustomSelect } from "../../components";
import { useForm } from "react-hook-form";
import { useImagePreview } from "../../hooks/useImagePreview";
import useValidAdmin from "../../utils/validAdmin";

export default function NewSportsEntity() {

    useValidAdmin("/user/profile");

    // const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const { imagePreview, handleImageChange } = useImagePreview();

    const entityTypeOptions = [
        { value: "asociación", label: "Asociacion" },
        { value: "federacion", label: "Federacion" },
        { value: "club", label: "Club" },
    ];

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {

        console.log(data);

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("entity_type", data.entity_type.value);
        formData.append("phone_number", data.phone_number);
        formData.append("description", data.description);

        if (data.photo.length > 0) {
            formData.append('photo', data.photo[0]);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/entities/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            
            const result = await response.json();

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || '¡Algo salió mal! Inténtalo de nuevo más tarde.',
                });
            }


            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'La entidad ha sido actualizada correctamente.',
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
            console.error(error);
        }
    };

    return (
        <>
            <main className="p-4">
                <PrimaryHeading>Crear nueva entidad deportiva</PrimaryHeading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SubHeading className="mt-4">Imagen nueva</SubHeading>
                    <Input
                        textLabel={"Foto de la entidad"}
                        type={"file"}
                        id={"photo"}
                        name={"photo"}
                        register={register}
                        onChange={handleImageChange}
                        validation={{
                            required: { value: true, message: 'La imagen es requerida' },
                        }}
                        error={errors.photo?.message}
                    />

                    {imagePreview && (
                        <div className="image-preview mt-2">
                            <img src={imagePreview} alt="Previsualización de la imagen" className="rounded-lg border border-gray-300 shadow-sm" />
                        </div>
                    )}

                    <Input
                        icon="/person.svg"
                        textLabel="Nombre"
                        type="text"
                        margin="mt-4"
                        name="name"
                        placeholder="Ingrese su Nombre"
                        register={register}
                        validation={{
                            required: { value: true, message: 'El nombre es requerido' },
                            minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
                        }}
                        error={errors.name?.message}
                    />

                    <CustomSelect
                        control={control}
                        name="entity_type"
                        label="Tipo de entidad"
                        options={entityTypeOptions}
                        placeholder="Seleccione el tipo de entidad"
                        rules={{ required: 'El tipo de entidad es requerido' }}
                        error={errors.entity_type}
                    />

                    <Input
                        icon="/phone.svg"
                        textLabel="Número de Teléfono"
                        type="tel"
                        margin="mt-4"
                        name="phone_number"
                        placeholder="Ingrese su número de teléfono"
                        register={register}
                        validation={{
                            required: { value: true, message: 'El número de teléfono es requerido' },
                            maxLength: { value: 10, message: 'Tu teléfono no puede contener mas de 10 caracteres' },
                        }}
                        error={errors.phone_number?.message}
                    />

                    <Input
                        icon="/text.svg"
                        textLabel="Descripción"
                        type="text"
                        margin="mt-4"
                        name="description"
                        placeholder="Ingrese una breve descripción"
                        register={register}
                        validation={{
                            required: { value: true, message: 'La descripción es requerida' },
                            minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' },
                        }}
                        error={errors.description?.message}
                    />

                    <Button type="submit" margin="mt-6" text={"ACTUALIZAR"} />
                </form>
            </main>
        </>
    );
};
