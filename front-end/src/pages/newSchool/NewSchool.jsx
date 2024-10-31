import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { PrimaryHeading, Input, Button, CustomSelect } from "../../components";
import { useForm } from "react-hook-form";
import { useImagePreview } from "../../hooks/useImagePreview";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";


export default function NewSchool() {

    useValidAdmin("/user/profile");

    const navigateTo = useNavigateTo();

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const [localities, setLocalities] = useState([]);

    const { imagePreview, handleImageChange } = useImagePreview();

    const educationalLevelOptions = [
        { value: "primaria", label: "Primaria" },
        { value: "secundaria", label: "Secundaria" },
        { value: "universidad", label: "Universidad" },
    ];

    const typoOfSchoolOptions = [
        { value: "publica", label: "Pública" },
        { value: "privada", label: "Privada" },
    ];

    useEffect(() => {
        const fectData = async () => {
            const response = await fetch("http://localhost:3000/api/localities");
            const data = await response.json();
            setLocalities(data);
        };
        fectData();
    }, []);

    const localityOptions = localities.map((locality) => ({
        value: locality.id,
        label: locality.name
    }));

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {

        console.log(data);

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("locality_id", data.locality_id.value);
        formData.append("phone_number", data.phone_number);
        formData.append("address", data.address);
        formData.append("type_of_school", data.type_of_school.value);
        formData.append("educational_level", data.educational_level.value);
        formData.append("photo", data.photo[0]);

        const response = await fetch("http://localhost:3000/api/schools", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const result = await response.json();

        if (response.ok || response.status === 201) {
            Swal.fire({
                title: "Escuela Registrada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });

            navigateTo("/dashboard/school/all");

        } else {
            Swal.fire({
                title: "Error",
                text: result.message || "Ocurrió un error al registrar la escuela",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            window.location.reload();
        }
    };

    return (
        <main className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col gap-4 max-w-md p-8 bg-white rounded-lg shadow-lg"
            >
                <PrimaryHeading>Registrar Escuela</PrimaryHeading>

                <Input
                    icon=""
                    textLabel="Nombre de la Escuela"
                    type="text"
                    margin="mt-4"
                    name="name"
                    placeholder="Ingrese el nombre de la escuela"
                    register={register}
                    validation={{
                        required: { value: true, message: "El nombre es requerido" },
                        minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "El nombre solo puede contener letras y espacios",
                        },
                    }}
                    error={errors.name?.message}
                />

                <CustomSelect
                    control={control}
                    name="locality_id"
                    label="Localidad"
                    options={localityOptions}
                    placeholder="Seleccione su localidad"
                    rules={{ required: 'Debes seleccionar una localidad' }}
                    error={errors.locality_id}
                />

                <Input
                    icon="/phone.svg"
                    textLabel="Teléfono"
                    type="tel"
                    margin="mt-4"
                    name="phone_number"
                    placeholder="Ingrese su Teléfono"
                    register={register}
                    validation={{
                        required: 'Debes ingresar tu teléfono',
                        maxLength: { value: 10, message: 'Tu teléfono no puede contener más de 10 caracteres' },
                    }}
                    error={errors.phone_number?.message}
                />

                <Input
                    icon="/address.svg"
                    textLabel="Dirección"
                    type="text"
                    margin="mt-4"
                    name="address"
                    placeholder="Ingrese su Dirección"
                    register={register}
                    validation={{
                        required: 'Debes ingresar tu dirección',
                        maxLength: { value: 64, message: 'Tu dirección no puede contener más de 64 caracteres' },
                    }}
                    error={errors.street?.message}
                />

                <CustomSelect
                    control={control}
                    name="type_of_school"
                    label="Tipo de Escuela"
                    options={typoOfSchoolOptions}
                    placeholder="Seleccione el tipo de escuela"
                    rules={{ required: 'Debes seleccionar uno' }}
                    error={errors.type_of_school}
                />

                <CustomSelect
                    control={control}
                    name="educational_level"
                    label="Nivel Educativo"
                    options={educationalLevelOptions}
                    placeholder="Seleccione el nivel educativo"
                    rules={{ required: 'Debes seleccionar uno' }}
                    error={errors.educational_level}
                />

                <Input
                    textLabel="Foto de la Escuela"
                    type="file"
                    id="photo"
                    name="photo"
                    register={register}
                    validation={{
                        required: 'Debes subir una foto de la escuela',
                    }}
                    error={errors.photo?.message}
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <div className="image-preview mt-4">
                        <img src={imagePreview} alt="Previsualización de la imagen" className="w-full h-auto rounded" />
                    </div>
                )}

                <Button type="submit" margin="mt-4" text="Registrar" />
            </form>
        </main>

    );
};