import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PrimaryHeading, Input, Button, CustomSelect } from "../../components";
import { useForm } from "react-hook-form";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";

export default function EditSport() {

    useValidAdmin("/user/profile");

    const navigateTo = useNavigateTo();

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            name: "",
            type_of_sport: "",
            description: "",
            history: "",
        }
    });

    const { id } = useParams();

    // eslint-disable-next-line no-unused-vars
    const [sport, setSport] = useState({});

    const typeOfSportOptions = [
        { value: "acuatico", label: "Acuatico" },
        { value: "combate", label: "Combate" },
        { value: "equipo", label: "Equipo" },
        { value: "individual", label: "Individual" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sports/${id}`);

                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();

                setSport(data);

                setValue("name", data.name);
                setValue("type_of_sport", typeOfSportOptions.find(option => option.value === data.type_of_sport));
                setValue("description", data.description);
                setValue("history", data.history);


            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {
        console.log(data);

        const response = await fetch(`http://localhost:3000/api/sports/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok || response.status === 201) {
            Swal.fire({
                title: "Deporte editado",
                text: "El deporte ha sido editado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            navigateTo("/dashboard/sports/all");
        } else {
            Swal.fire({
                title: "Error",
                text: result.message,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <>
            <main className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
                <PrimaryHeading>Registrar Deporte</PrimaryHeading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <Input
                        icon=""
                        textLabel="Nombre del deporte"
                        type="text"
                        margin="mt-4"
                        name="name"
                        placeholder="Ingrese el nombre del deporte"
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
                        name="type_of_sport"
                        label="Seleccione el tipo de deporte"
                        options={typeOfSportOptions}
                        placeholder="Seleccione el tipo de deporte"
                        rules={{ required: 'Debes seleccionar un tipo de deporte' }}
                        error={errors.type_of_sport}
                        className="mt-4"
                    />

                    <Input
                        icon=""
                        textLabel="Descripción del deporte"
                        type="text"
                        margin="mt-4"
                        name="description"
                        placeholder="Ingrese una descripción del deporte"
                        register={register}
                        validation={{
                            required: { value: true, message: "La descripción es requerida" },
                            minLength: { value: 12, message: "La descripción debe tener al menos 12 caracteres" },
                        }}
                        error={errors.description?.message}
                    />

                    <Input
                        icon=""
                        textLabel="Historia del deporte"
                        type="text"
                        margin="mt-4"
                        name="history"
                        placeholder="Ingrese la historia del deporte"
                        register={register}
                        validation={{
                            required: { value: true, message: "La historia es requerida" },
                            minLength: { value: 12, message: "La historia debe tener al menos 12 caracteres" },
                        }}
                        error={errors.history?.message}
                    />

                    <Button type="submit" text="EDITAR" margin="mt-6" />
                </form>
            </main>

        </>
    );
};
