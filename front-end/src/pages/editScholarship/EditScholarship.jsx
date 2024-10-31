import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PrimaryHeading, Button, SubHeading, Input, CardScholarship } from "../../components";
import useValidAdmin from "../../utils/validAdmin";
import Swal from "sweetalert2";
import useNavigateTo from "../../utils/fuctionNavigate";
export default function EditScholarship() {

    useValidAdmin("/user/profile");

    const navigateTo = useNavigateTo();

    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            sports_entity_id: '',
            sports_id: '',
            total_scholarships: '',
            scholarships_awarded: '',
            vacancy_amount: '',
        }
    });
    const [scholarship, setScholarship] = useState({});

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sports-availabilities/sport-availability/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener la información de la beca');
                }

                const data = await response.json();

                setScholarship(data);
                
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message || "No se pudo cargar la información de la beca",
                });
            }
        };

        fetchScholarship();
    }, [id]);


    console.log(scholarship)

    useEffect(() => {
        if (scholarship.id) {
            setValue("sports_entity_id", { value: scholarship.sports_entity.id, label: scholarship.sports_entity.name });
            setValue("sports_id", { value: scholarship.sport.id, label: scholarship.sport.name });
            setValue("total_scholarships", scholarship.total_scholarships);
            setValue("scholarships_awarded", scholarship.scholarships_awarded);
            setValue("vacancy_amount", scholarship.vacancy_amount);
        }
    }, [scholarship, setValue]);


    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sports-availabilities`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok || response.status === 201) {
                Swal.fire({
                    title: "Beca actualizada",
                    text: "La beca ha sido actualizada exitosamente",
                    icon: "success",
                    showConfirmButton: true,
                });

                navigateTo("/dashboard/scholarship");
            };


            if (!response.ok) {
                Swal.fire({
                    title: "Error",
                    text: result.message,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar la beca",
                icon: "error",
                showConfirmButton: true,
            });
        };
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
            {scholarship.id && (
                <>
                    <PrimaryHeading>Información Actual</PrimaryHeading>
                    <CardScholarship scholarship={scholarship} viewButton={false} />
                </>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <PrimaryHeading className="text-xl font-semibold text-gray-800">Editar Beca {scholarship ? scholarship.sports_entity?.name : ""}</PrimaryHeading>

                <div className="space-y-2">
                    <SubHeading>Cambiar información</SubHeading>

                    <Input
                        textLabel="Total de becas"
                        type="text"
                        name="total_scholarships"
                        placeholder="Ingrese total de becas"
                        register={register}
                        validation={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "El campo solo acepta números"
                            }
                        }}
                        error={errors.total_scholarships?.message}
                        className="mt-2"
                    />

                    <Input
                        textLabel="Becas otorgadas"
                        type="text"
                        name="scholarships_awarded"
                        placeholder="Ingrese becas otorgadas"
                        register={register}
                        validation={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "El campo solo acepta números"
                            }
                        }}
                        error={errors.scholarships_awarded?.message}
                        className="mt-2"
                    />

                    <Input
                        textLabel="Vacantes disponibles"
                        type="text"
                        name="vacancy_amount"
                        placeholder="Ingrese vacantes disponibles"
                        register={register}
                        validation={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "El campo solo acepta números"
                            }
                        }}
                        error={errors.vacancy_amount?.message}
                        className="mt-2"
                    />
                </div>

                <Button type="submit" text="Actualizar Beca" className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200" />
            </form>
        </div>
    );
}
