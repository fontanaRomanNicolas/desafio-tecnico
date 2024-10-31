import { PrimaryHeading, SubHeading, Input, Button } from '../../components';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../Context/UserContext';
import { useNavigate } from "react-router-dom";
import useValidUser from "../../utils/validUser";

export default function ChangePassword() {

    useValidUser();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useUserContext();

    const navigateTo = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: result.message,
                    confirmButtonText: 'Aceptar',
                });

                localStorage.removeItem('user');
                navigateTo('/user/login');
            } else if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.error
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar la contraseña'
            });
        }
    };

    return (
        <main className="max-w-md mx-auto p-6 h-full shadow-lg rounded-lg flex items-center justify-center flex-col">
            <article className="text-center mb-6">
                <PrimaryHeading>Cambiar Contraseña</PrimaryHeading>
                <SubHeading size="text-sm">Por favor, ingresa tu contraseña actual y la nueva</SubHeading>
            </article>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    icon="/lock.svg"
                    textLabel="Contraseña actual"
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña actual"
                    register={register}
                    validation={{
                        required: 'Debes ingresar tu contraseña actual',
                        minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                    }}
                    error={errors.password?.message}
                />
                <Input
                    icon="/lock.svg"
                    textLabel="Nueva contraseña"
                    type="password"
                    name="newPassword"
                    placeholder="Ingresa tu nueva contraseña"
                    register={register}
                    validation={{
                        required: 'Debes ingresar tu nueva contraseña',
                        minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                    }}
                    error={errors.newPassword?.message}
                />

                <div className="text-center mt-6">
                    <Button text="CAMBIAR" bg="bg-blue-500" />
                </div>
            </form>
        </main>

    );
}
