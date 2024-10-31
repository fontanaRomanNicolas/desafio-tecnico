import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { PrimaryHeading, Input, Button, CustomSelect, SubHeading } from "../../components";
import { useForm } from "react-hook-form";
import { useImagePreview } from "../../hooks/useImagePreview";
import { useParams } from "react-router-dom";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";

export default function EditSchool() {

    useValidAdmin("/user/profile");

    const navigateTo = useNavigateTo();

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            name: '',
            locality_id: '',
            phone_number: '',
            address: '',
            type_of_school: '',
            educational_level: '',
        }
    });

    const [localities, setLocalities] = useState([]);
    const [school, setSchool] = useState({});
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
            try {
                const fetchLocalities = await fetch("http://localhost:3000/api/localities");
                const fetchSchool = await fetch(`http://localhost:3000/api/schools/${id}`);

                if (!fetchLocalities.ok || !fetchSchool.ok) {
                    throw new Error('Error fetching data');
                }

                const localitiesData = await fetchLocalities.json();
                const schoolData = await fetchSchool.json();

                setLocalities(localitiesData);
                setSchool(schoolData);

                setValue('name', schoolData.name);
                setValue('locality_id', { value: schoolData.locality_id, label: localitiesData.find(l => l.id === schoolData.locality_id)?.name });
                setValue('phone_number', schoolData.phone_number);
                setValue('address', schoolData.address);
                setValue('type_of_school', typoOfSchoolOptions.find(option => option.value === schoolData.type_of_school));
                setValue('educational_level', educationalLevelOptions.find(option => option.value === schoolData.educational_level));
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al cargar los datos",
                    icon: "error",
                    showConfirmButton: true,
                });
                navigateTo("/dashboard/school/all");
            }
        };

        fectData();
    }, [id, setValue]);

    const localityOptions = localities.map((locality) => ({
        value: locality.id,
        label: locality.name
    }));

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("locality_id", data.locality_id.value);
        formData.append("phone_number", data.phone_number);
        formData.append("address", data.address);
        formData.append("type_of_school", data.type_of_school.value);
        formData.append("educational_level", data.educational_level.value);
        formData.append("photo", data.photo[0]);

        const response = await fetch(`http://localhost:3000/api/schools/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok || response.status === 201) {
            Swal.fire({
                title: "Escuela Actualizada",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigateTo("/dashboard/school/all");
        } else {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar la escuela",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            navigateTo("/dashboard/school/all");
        }
    };

    const imageSrc = school.photo ? `http://localhost:3000/ftp/image/${school.photo.photo}` : 'ruta/a/imagen/por/defecto.jpg';

    return (
        <main className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <PrimaryHeading>Modificar entidad deportiva</PrimaryHeading>
            <SubHeading color="text-gray-800" size="text-lg" margin="mt-6">
                Nombre de la entidad: {school.name}
            </SubHeading>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                <img
                    src={imageSrc}
                    alt="imagen-actual"
                    className="mt-4 mb-4 rounded-lg shadow-md"
                />

                <PrimaryHeading>Actualizar foto de la escuela</PrimaryHeading>

                <Input
                    textLabel={"Nueva foto - opcional -"}
                    type={"file"}
                    id={"photo"}
                    name={"photo"}
                    register={register}
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <div className="image-preview mt-4">
                        <img src={imagePreview} alt="Previsualización de la imagen" className="rounded-lg shadow-md" />
                    </div>
                )}

                <Input
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
                            message: "El nombre solo puede contener letras y espacios"
                        }
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
                    textLabel="Número de Teléfono"
                    type="text"
                    margin="mt-4"
                    name="phone_number"
                    placeholder="Ingrese el número de teléfono"
                    register={register}
                    validation={{
                        required: { value: true, message: "El teléfono es requerido" },
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "El número de teléfono debe tener 10 dígitos"
                        }
                    }}
                    error={errors.phone_number?.message}
                />

                <Input
                    textLabel="Dirección"
                    type="text"
                    margin="mt-4"
                    name="address"
                    placeholder="Ingrese la dirección de la escuela"
                    register={register}
                    validation={{
                        required: { value: true, message: "La dirección es requerida" },
                        minLength: { value: 5, message: "La dirección debe tener al menos 5 caracteres" }
                    }}
                    error={errors.address?.message}
                />

                <CustomSelect
                    control={control}
                    name="type_of_school"
                    label="Tipo de Escuela"
                    options={typoOfSchoolOptions}
                    placeholder="Seleccione el tipo de escuela"
                    rules={{ required: 'Debes seleccionar un tipo de escuela' }}
                    error={errors.type_of_school}
                />

                <CustomSelect
                    control={control}
                    name="educational_level"
                    label="Nivel Educativo"
                    options={educationalLevelOptions}
                    placeholder="Seleccione el nivel educativo"
                    rules={{ required: 'Debes seleccionar un nivel educativo' }}
                    error={errors.educational_level}
                />

                <Button margin="mt-6" type="submit" text={"ACTUALIZAR"} />
            </form>
        </main>
    );
}
