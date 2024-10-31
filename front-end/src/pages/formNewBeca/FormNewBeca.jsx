/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PrimaryHeading, SubHeading, Input, Button, CustomSelect } from "../../components";
import { useImagePreview } from "../../hooks/useImagePreview";
import { useParams } from "react-router-dom";
import useNavigateTo from "../../utils/fuctionNavigate";
import Swal from "sweetalert2";
export default function FormNewBeca() {

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const { imagePreview, handleImageChange } = useImagePreview();

    const [localities, setLocalities] = useState([]);
    const [schools, setSchools] = useState([]);
    const [entitiesSport, setEntitiesSport] = useState([]);
    const [sportsOptions, setSportsOptions] = useState([]);

    const navigate = useNavigateTo();

    const { id } = useParams();

    const [user, setUser] = useState(null); // Inicializar como null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/${id}`);
                if (!response.ok) {
                    console.error('Error fetching user data:', response.statusText);
                    return;
                }
                const data = await response.json();

                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (user && user.id) { // Asegúrate de que la verificación sea correcta
            Swal.fire({
                title: 'Ya te encuentras inscripto en una beca deportiva',
                text: 'Ya te encuentras inscripto en una beca deportiva. ¿Deseas iniciar sesión o realizar otra inscripción?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Iniciar Sesión',
                cancelButtonText: 'Nueva inscripción',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/user/login');
                } else {
                    navigate("/registrations/form-renewal-scholarship");
                }
            });
        }
    }, [user, navigate]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchLocalities = await fetch('http://localhost:3000/api/localities').then((response) => response.json());
            const fetchSchools = await fetch('http://localhost:3000/api/schools').then((response) => response.json());
            const fetchEntitiesSport = await fetch('http://localhost:3000/api/sports-availabilities').then((response) => response.json());
            const [localitiesData, schoolsData, entitiesSportData] = await Promise.all([fetchLocalities, fetchSchools, fetchEntitiesSport]);
            setLocalities(localitiesData);
            setSchools(schoolsData);
            setEntitiesSport(entitiesSportData);
        }

        fetchData();
    }, []);

    const genderOptions = [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' }
    ];

    const entitiesSportOptions = entitiesSport.map((entitySport) => ({
        value: entitySport.sports_entity.id,
        label: entitySport.sports_entity.name
    }));

    const schoolOptions = schools.map((school) => ({
        value: school.id,
        label: school.name
    }));

    const localityOptions = localities.map((locality) => ({
        value: locality.id,
        label: locality.name
    }));

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastname', data.lastname);
        formData.append('identification_document', data.identification_document);
        formData.append('birthdate', data.birthdate);
        formData.append('gender', data.gender.value);
        formData.append('school', data.school.value);
        formData.append('phone_number', data.phone_number);
        formData.append('email', data.email);
        formData.append('locality_id', data.locality_id.value);
        formData.append('neighborhood', data.neighborhood);
        formData.append('street', data.street);
        formData.append('house_number', data.house_number);
        formData.append('sports_entity_id', data.sports_entity_id.value);
        formData.append('sport_id', data.sport_id.value);

        if (data.dni_image.length > 0) {
            formData.append('dni_image', data.dni_image[0]);
        }

        try {
            const response = await fetch('http://localhost:3000/api/application-to-sport/new', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito al inscribirse',
                    text: result.message,
                    confirmButtonText: 'Aceptar',
                });

                navigate('/user/login');
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
                        navigate("/");
                    }
                });
            } else {
                console.log(response)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
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

        console.log(entityId);

        const response = await fetch(`http://localhost:3000/api/sports-availabilities/${entityId}`);
        const data = await response.json();

        setSportsOptions(data.map((sport) => ({
            value: sport.sport.id,
            label: sport.sport.name
        })));

    };

    return (
        <main className="p-0">
            <article className="max-w-lg mx-auto">
                <PrimaryHeading>Formulario de inscripción a beca deportiva</PrimaryHeading>
            </article>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-md">
                <section>
                    <SubHeading color="text-gray-800" size="text-lg">
                        Datos del aspirante
                    </SubHeading>
                    <Input
                        icon="/person.svg"
                        textLabel="Nombre"
                        type="text"
                        name="name"
                        placeholder="Ingrese su Nombre"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu nombre',
                            maxLength: { value: 64, message: 'Tu nombre no puede contener más de 64 caracteres' },
                            minLength: { value: 3, message: 'Tu nombre debe tener al menos 3 caracteres' },
                            pattern: { value: /^[A-Za-z]+$/i, message: 'Tu nombre solo puede contener letras' }
                        }}
                        error={errors.name?.message}
                        className="mt-4"
                    />
                    <Input
                        icon="/person.svg"
                        textLabel="Apellido"
                        type="text"
                        id={"lastname"}
                        name="lastname"
                        placeholder="Ingrese su Apellido"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu apellido',
                            maxLength: { value: 64, message: 'Tu apellido no puede contener más de 64 caracteres' },
                            minLength: { value: 3, message: 'Tu apellido debe tener al menos 3 caracteres' },
                            pattern: { value: /^[A-Za-z]+$/i, message: 'Tu apellido solo puede contener letras' }
                        }}
                        error={errors.lastname?.message}
                        className="mt-4"
                    />
                    <Input
                        icon="/document.svg"
                        textLabel="DNI"
                        type="number"
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
                        className="mt-4"
                    />

                    <Input
                        icon="/calendar.svg"
                        textLabel="Fecha de Nacimiento"
                        type="date"
                        name="birthdate"
                        placeholder="Ingrese su Fecha de Nacimiento"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu fecha de nacimiento',
                        }}
                        error={errors.birthdate?.message}
                        className="mt-4"
                    />

                    <CustomSelect
                        control={control}
                        name="gender"
                        label="Género"
                        options={genderOptions}
                        placeholder="Seleccione su género"
                        rules={{ required: 'Debes seleccionar un género' }}
                        error={errors.gender}
                        className="mt-4"
                    />

                    <CustomSelect
                        control={control}
                        name="school"
                        label="Colegio"
                        options={schoolOptions}
                        placeholder="Seleccione su colegio"
                        rules={{ required: 'Debes seleccionar un colegio' }}
                        error={errors.school}
                        className="mt-4"
                    />

                    <Input
                        icon="/phone.svg"
                        textLabel="Teléfono"
                        type="tel"
                        name="phone_number"
                        placeholder="Ingrese su Teléfono"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu teléfono',
                            maxLength: { value: 10, message: 'Tu teléfono no puede contener más de 10 caracteres' },
                        }}
                        error={errors.phone_number?.message}
                        className="mt-4"
                    />

                    <Input
                        icon="/email.svg"
                        textLabel="Correo Electrónico"
                        type="email"
                        name="email"
                        placeholder="Ingrese su Correo Electrónico"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu correo electrónico',
                            pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, message: 'Correo electrónico inválido' }
                        }}
                        error={errors.email?.message}
                        className="mt-4"
                    />
                </section>

                <section>
                    <SubHeading color="text-gray-800" size="text-lg">Información de domicilio</SubHeading>

                    <CustomSelect
                        control={control}
                        name="locality_id"
                        label="Localidad"
                        options={localityOptions}
                        placeholder="Seleccione su localidad"
                        rules={{ required: 'Debes seleccionar una localidad' }}
                        error={errors.locality_id}
                        className="mt-4"
                    />
                    <Input
                        icon="/neighborhood.svg"
                        textLabel="Barrio"
                        type="text"
                        name="neighborhood"
                        placeholder="Ingrese su Barrio"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu barrio',
                            maxLength: { value: 64, message: 'Tu barrio no puede contener más de 64 caracteres' },
                        }}
                        error={errors.neighborhood?.message}
                        className="mt-4"
                    />

                    <Input
                        icon="/address.svg"
                        textLabel="Dirección"
                        type="text"
                        name="street"
                        placeholder="Ingrese su Dirección"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu dirección',
                            maxLength: { value: 64, message: 'Tu dirección no puede contener más de 64 caracteres' },
                        }}
                        error={errors.street?.message}
                        className="mt-4"
                    />

                    <Input
                        icon="/housenumber.svg"
                        textLabel="Altura"
                        type="number"
                        name="house_number"
                        placeholder="Ingrese la Altura"
                        register={register}
                        validation={{
                            required: 'Debes ingresar la altura',
                            maxLength: { value: 5, message: 'La altura no puede contener más de 5 caracteres' },
                            pattern: { value: /^[0-9]+$/i, message: 'La altura solo puede contener números' }
                        }}
                        error={errors.house_number?.message}
                        className="mt-4"
                    />
                </section>

                <section>
                    <SubHeading>Foto del documento</SubHeading>
                    <Input
                        textLabel={"Foto del DNI"}
                        type={"file"}
                        id={"dni_image"}
                        name={"dni_image"}
                        register={register}
                        validation={{
                            required: 'Debes subir una foto de tu DNI',
                        }}
                        error={errors.dni_image?.message}
                        onChange={handleImageChange}
                        className="mt-4"
                    />

                    {imagePreview && (
                        <div className="image-preview mt-4">
                            <img src={imagePreview} alt="Previsualización de la imagen" className="w-full h-auto rounded-md shadow-sm" />
                        </div>
                    )}
                </section>

                <section>
                    <SubHeading color="text-gray-800" size="text-lg">Seleccione la entidad deportiva y el deporte que desee</SubHeading>

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
                </section>

                <Button text="Enviar" icon="/addus.svg" className="mt-6" />
            </form>
        </main>

    );
}