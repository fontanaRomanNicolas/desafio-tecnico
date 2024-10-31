import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PrimaryHeading, SubHeading, Input, Button, CustomSelect } from "../../components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormRenewalScholarship() {

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [entitiesSport, setEntitiesSport] = useState([]);
    const [sportsOptions, setSportsOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fetchEntitiesSport = await fetch('http://localhost:3000/api/sports-availabilities').then((response) => response.json());
            const [entitiesSportData] = await Promise.all([fetchEntitiesSport]);
            setEntitiesSport(entitiesSportData);
        }

        fetchData();
    }, []);

    const entitiesSportOptions = entitiesSport.map((entitySport) => ({
        value: entitySport.sports_entity?.id,
        label: entitySport.sports_entity?.name
    }));

    const onSubmit = async (data) => {

        console.log(data);

        const formData = new FormData();
        formData.append('identification_document', data.identification_document);
        formData.append('sports_entity_id', data.sports_entity_id.value);
        formData.append('sport_id', data.sport_id.value);

        try {
            const response = await fetch('http://localhost:3000/api/application-to-sport/renewal-scholarship', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identification_document: data.identification_document,
                    sports_entity_id: data.sports_entity_id.value,
                    sport_id: data.sport_id.value
                }),
            });

            const result = await response.json();

            if (response.ok || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: result.message,
                    confirmButtonText: 'Aceptar',
                });

                navigate('/user/profile');
            } else if (response.status === 409) {
                Swal.fire({
                    title: 'Ya te encuentras inscripto en una beca deportiva',
                    text: result.message || 'Ya te encuentras inscripto en una beca deportiva. ¿Deseas iniciar sesión o realizar otra inscripción?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Iniciar Sesión',
                    cancelButtonText: 'Realizar otra inscripción',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/user/login');
                    } else {
                        navigate("/registrations/form-renewal-scholarship");
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al enviar la solicitud. Intente nuevamente.',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const handleEntityChange = async (selectedOption) => {


        const entityId = selectedOption.value;

        const response = await fetch(`http://localhost:3000/api/sports-availabilities/${entityId}`);
        const data = await response.json();

        setSportsOptions(data.map((sport) => ({
            value: sport.sport.id,
            label: sport.sport.name
        })));

    };

    return (
        <>
            <main className="flex flex-col items-center p-4">
                <PrimaryHeading>Nueva inscripción a Becas Deportivas</PrimaryHeading>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg md:max-w-xl lg:max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
                    <article>
                        <SubHeading color="text-gray-800" size="text-lg" margin="mt-6">
                            Datos del aspirante
                        </SubHeading>
                        <Input
                            icon="/document.svg"
                            textLabel="DNI"
                            type="number"
                            margin="mt-4"
                            name="identification_document"
                            placeholder="Ingrese su DNI"
                            register={register}
                            validation={{
                                required: 'Debes ingresar tu DNI',
                                maxLength: { value: 8, message: 'Tu DNI no puede contener más de 8 caracteres' },
                                minLength: { value: 7, message: 'Tu DNI debe tener al menos 7 caracteres' },
                                pattern: { value: /^[0-9]+$/i, message: 'Tu DNI solo puede contener números' }
                            }}
                            error={errors.identification_document?.message}
                        />
                    </article>

                    <article>
                        <SubHeading color="text-gray-800" size="text-lg" margin="mt-6">
                            Seleccione la entidad deportiva y el deporte que desee
                        </SubHeading>

                        <CustomSelect
                            control={control}
                            name="sports_entity_id"
                            label="Entidad deportiva"
                            options={entitiesSportOptions}
                            placeholder="Seleccione una entidad deportiva"
                            rules={{ required: 'Debes seleccionar una entidad deportiva' }}
                            error={errors.sports_entity_id}
                            handleFetch={handleEntityChange}
                        />

                        <CustomSelect
                            control={control}
                            name="sport_id"
                            label="Deporte"
                            options={sportsOptions}
                            placeholder="Seleccione un deporte"
                            rules={{ required: 'Debes seleccionar un deporte' }}
                            error={errors.sport_id}
                        />
                    </article>
                    <div className="text-center mt-6">
                        <Button text="Enviar" icon="/addus.svg" />
                    </div>
                </form>
            </main>
        </>
    );
}