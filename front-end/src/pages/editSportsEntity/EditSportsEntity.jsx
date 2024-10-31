import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useNavigate from "../../utils/fuctionNavigate";
import { PrimaryHeading, SubHeading, Input, Button, CustomSelect } from "../../components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useImagePreview } from "../../hooks/useImagePreview";
import useValidAdmin from "../../utils/validAdmin";

export default function EditSportsEntity() {

    useValidAdmin("/user/profile");

    const { id } = useParams();
    const navigate = useNavigate();
    const [sportsEntity, setSportsEntity] = useState({});
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            name: '',
            entity_type: '',
            phone_number: '',
            description: ''
        }
    });
    const { imagePreview, handleImageChange } = useImagePreview();

    const entityTypeOptions = [
        { value: "asociación", label: "Asociacion" },
        { value: "federacion", label: "Federacion" },
        { value: "club", label: "Club" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/entities/${id}`);

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                    return;
                }

                const data = await response.json();
                setSportsEntity(data);

                setValue('name', data.name);
                setValue('entity_type', data.entity_type);
                setValue('phone_number', data.phone_number);
                setValue('description', data.description);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                console.error(error);
            }
        };

        fetchData();
    }, [id, setValue]);

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
            const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar la entidad');
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'La entidad ha sido actualizada correctamente.',
            });
    
            navigate('/ruta-a-donde-redirigir');
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
            <main className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
                <PrimaryHeading>Modificar entidad deportiva</PrimaryHeading>
                <SubHeading color="text-gray-800" size="text-lg" margin="mt-6">
                    {sportsEntity.name}
                </SubHeading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <img
                        src={`http://localhost:3000/ftp/image/${sportsEntity.photo?.photo}`}
                        alt="imagen-actual"
                        className="mt-4 mb-4 rounded-lg shadow-md w-full object-cover h-48"
                    />

                    <SubHeading className="mt-4">Imagen nueva</SubHeading>
                    <Input
                        textLabel={"Foto de la entidad"}
                        type={"file"}
                        id={"photo"}
                        name={"photo"}
                        register={register}
                        onChange={handleImageChange}
                        margin="mt-2"
                    />

                    {imagePreview && (
                        <div className="image-preview mt-2">
                            <img
                                src={imagePreview}
                                alt="Previsualización de la imagen"
                                className="rounded-lg border border-gray-300 shadow-sm"
                            />
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
                    />

                    <CustomSelect
                        control={control}
                        name="entity_type"
                        label="Tipo de entidad"
                        options={entityTypeOptions}
                        placeholder="Seleccione el tipo de entidad"
                        className="mt-4"
                    />

                    <Input
                        icon="/phone.svg"
                        textLabel="Número de Teléfono"
                        type="tel"
                        margin="mt-4"
                        name="phone_number"
                        placeholder="Ingrese su número de teléfono"
                        register={register}
                    />

                    <Input
                        icon="/text.svg"
                        textLabel="Descripción"
                        type="text"
                        margin="mt-4"
                        name="description"
                        placeholder="Ingrese una breve descripción"
                        register={register}
                    />
                    <Button type="submit" margin="mt-6" text={"ACTUALIZAR"} />
                </form>
            </main>
        </>
    );
};
