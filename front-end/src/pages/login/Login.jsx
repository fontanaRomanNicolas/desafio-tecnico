import Swal from "sweetalert2";
import { Input, PrimaryHeading, Button } from "../../components";
import useNavigateTo from "../../utils/fuctionNavigate";
import { useUserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";

export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigateTo = useNavigateTo();
    const { updateUser } = useUserContext();

    const onSubmit = async (data) => {

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Algo salió mal. Inténtalo de nuevo.'
                });
                return;
            }

            updateUser(result.user);

            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Has iniciado sesión correctamente'
            });

            navigateTo('/user/profile');

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor. Inténtalo más tarde.'
            });
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex justify-start gap-16 flex-col max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <PrimaryHeading>Iniciar Sesión</PrimaryHeading>

                    <div>
                    <Input
                        icon="/person.svg"
                        textLabel="Ingrese su email"
                        type="text"
                        margin="mt-4"
                        name="email"
                        placeholder="Ejemplo: ejemplo@gmail.com"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu email',
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Debes ingresar un email válido'
                            }
                        }}
                        error={errors.email?.message}
                    />

                    <Input
                        icon="/lock.svg"
                        textLabel="Ingrese su contraseña"
                        type="password"
                        margin="mt-4"
                        name="password"
                        placeholder="********"
                        register={register}
                        validation={{
                            required: 'Debes ingresar tu contraseña'
                        }}
                        error={errors.password?.message}
                    />
                    </div>

                    <Button text="INICIAR SESIÓN" disabled={isSubmitting} />
                </form>
            </div>
        </>
    );
}
