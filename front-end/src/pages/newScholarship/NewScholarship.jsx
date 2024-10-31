import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, SubHeading, Input, CustomSelect } from "../../components";
import Swal from "sweetalert2";
import useValidAdmin from "../../utils/validAdmin";

export default function NewScholarship() {

    useValidAdmin("/user/profile");

    const { register, handleSubmit, formState: { errors }, control } = useForm({});

    const [sports, setSports] = useState([]);
    const [sportsEntities, setSportsEntities] = useState([]);

    useEffect(() => {
        const fechData = async () => {
            try {
                const fectSports = await fetch("http://localhost:3000/api/sports").then((response) => response.json());
                const fectSportsEntities = await fetch("http://localhost:3000/api/entities").then((response) => response.json());

                const [sportsData, sportsEntitiesData] = await Promise.all([fectSports, fectSportsEntities]);

                setSports(sportsData);
                setSportsEntities(sportsEntitiesData);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error al cargar datos",
                    text: "No se pudieron cargar las opciones de deportes y entidades deportivas.",
                });
            }
        };

        fechData();
    }, []);

    const entitiesSportOptions = sportsEntities.map((entitySport) => ({
        value: entitySport.id,
        label: entitySport.name
    }));

    const sportsOptions = sports.map((sport) => ({
        value: sport.id,
        label: sport.name
    }));

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sports-availabilities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok || response.status === 201) {
                Swal.fire({
                    title: "Beca creada con éxito",
                    text: "La beca ha sido registrada correctamente.",
                    icon: "success",
                    showConfirmButton: true,
                });
            } else if (response.status === 409) {
                Swal.fire({
                    title: "Beca ya existente",
                    text: result.message || "Esta beca ya está registrada para la entidad deportiva seleccionada.",
                    icon: "info",
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    title: "Error al crear la beca",
                    text: result.message || "Ocurrió un problema al intentar registrar la beca.",
                    icon: "error",
                    showConfirmButton: true,
                });
            }

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            Swal.fire({
                title: "Error en la solicitud",
                text: "Ocurrió un error inesperado al intentar registrar la beca.",
                icon: "error",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <div className="space-y-4">
                    <SubHeading>Crear beca</SubHeading>

                    <CustomSelect
                        control={control}
                        name="sports_entity_id"
                        label="Entidad deportiva"
                        options={entitiesSportOptions}
                        placeholder="Seleccione una entidad deportiva"
                        rules={{ required: 'Debes seleccionar una entidad deportiva' }}
                        error={errors.sports_entity_id}
                    />

                    <CustomSelect
                        control={control}
                        name="sports_id"
                        label="Deporte"
                        options={sportsOptions}
                        placeholder="Seleccione un deporte"
                        rules={{ required: 'Debes seleccionar un deporte' }}
                        error={errors.sport_id}
                    />

                    <Input
                        textLabel="Total de becas"
                        type="text"
                        name="total_scholarships"
                        placeholder="Ingrese total de becas"
                        register={register}
                        validation={{
                            required: "El campo es requerido",
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "El campo solo acepta números"
                            }
                        }}
                        error={errors.total_scholarships?.message}
                    />

                </div>

                <Button type="submit" text="Registrar Beca" className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700" />
            </form>
        </div>
    );
}
