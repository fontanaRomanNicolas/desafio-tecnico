import { useState } from "react";
import { Paragraph, PrimaryHeading, Button, SubHeading, Input } from "../../components";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useNavigateTo from '../../utils/fuctionNavigate';

export default function Inscripciones() {
    const [dni, setDni] = useState('');
    const funcionNavegar = useNavigateTo();

    const handleForm = () => {
        if (dni) {
            funcionNavegar(`/registrations/form/${dni}`);
        } else {
            Swal.fire({
                title: 'Atención',
                text: 'Debes ingresar tu DNI para continuar',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const { register, formState: { errors } } = useForm();

    return (
        <main className="flex flex-col items-center p-4 md:p-8 lg:p-12">
            <div className="w-full md:w-1/3 lg:w-1/4">
                <img
                    src="/logo-san-nicolas.png"
                    alt="logo de san nicolas de los arroyos"
                    className="w-full h-auto mt-4 mb-8"
                />
            </div>
            <article className="w-full max-w-xl">
                <PrimaryHeading className="text-center">Inscripción a Becas Deportivas</PrimaryHeading>
                <Paragraph padding="p-0" width="w-full" margin="mt-4" className="text-center">
                    En este sitio, tienes la oportunidad de aspirar a una beca deportiva o renovar tu beca actual completando un formulario con la información requerida.
                </Paragraph>
                <Button text="Consultar becas" icon={"/statistics.svg"} onClick={() => funcionNavegar('/scholarships')} />
                <SubHeading color="text-gray-800" size="text-lg" margin="mt-12" className="text-center">Inscripción/Renovación</SubHeading>

                <Input
                    icon="/document.svg"
                    textLabel="Ingrese su DNI"
                    type="text"
                    margin="mt-12"
                    name="identification_document"
                    id="identification_document"
                    placeholder="Ingrese su DNI"
                    onChange={(e) => setDni(e.target.value)}
                    onBlur={() => console.log('Input perdido foco')}
                    register={register}
                    validation={{
                        required: 'Debes ingresar tu DNI',
                        maxLength: { value: 8, message: 'Tu DNI no puede contener más de 8 caracteres' },
                        minLength: { value: 7, message: 'Tu DNI debe tener al menos 7 caracteres' },
                        pattern: { value: /^[0-9]+$/i, message: 'Tu DNI solo puede contener números' }
                    }}
                    error={errors.identification_document?.message}
                />
                <Button text="Inscribirse" icon="/registration.svg" onClick={handleForm} />
            </article>
        </main>
    );
}
