import Swal from "sweetalert2";
import { PrimaryHeading, Input, Button, CustomSelect } from "../../components";
import { useForm } from "react-hook-form";
import useValidAdmin from "../../utils/validAdmin";

export default function NewSport() {

    useValidAdmin("/user/profile");

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const typeOfSportOptions = [
        { value: "acuatico", label: "Acuatico" },
        { value: "combate", label: "Combate" },
        { value: "equipo", label: "Equipo" },
        { value: "individual", label: "Individual" },
    ];

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    const onSubmit = async (data) => {
        console.log(data);

        const response = await fetch("http://localhost:3000/api/sports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok || response.status === 201) {
            Swal.fire({
                title: "Deporte registrado",
                text: "El deporte ha sido registrado exitosamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
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
            <main className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
                <PrimaryHeading>Registrar Deporte</PrimaryHeading>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <Input
                        icon=""
                        textLabel="Nombre del deporte"
                        type="text"
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
                    />

                    <Input
                        icon=""
                        textLabel="Descripción del deporte"
                        type="text"
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
                        name="history"
                        placeholder="Ingrese la historia del deporte"
                        register={register}
                        validation={{
                            required: { value: true, message: "La historia es requerida" },
                            minLength: { value: 12, message: "La historia debe tener al menos 12 caracteres" },
                        }}
                        error={errors.history?.message}
                    />

                    <Button type="submit" text="CREAR" margin="mt-6" />
                </form>
            </main>

        </>
    );
};
