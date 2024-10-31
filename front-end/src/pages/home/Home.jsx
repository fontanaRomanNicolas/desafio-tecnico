import { PrimaryHeading, Paragraph, CircleButton, Button } from '../../components';
import useNavigateTo from '../../utils/fuctionNavigate';

export default function Home() {
  const funcionNavegar = useNavigateTo();

  const handleNavigation = (path) => {
    funcionNavegar(path);
  };

  return (
    <>
      <main className="flex flex-col justify-start items-center h-full p-4 md:p-8 lg:p-12">
        <section className="w-full max-w-4xl flex flex-col items-center space-y-6">
          <div className="w-full md:w-2/3 lg:w-1/3">
            <img
              src="/logo-san-nicolas.png"
              alt="logo de san nicolas de los arroyos"
              className="w-full h-auto mt-4 mb-4"
            />
          </div>
          <article className='text-center'>
            <PrimaryHeading>Inscripción a Becas Deportivas</PrimaryHeading>
          </article>
          <div className="w-full md:w-3/4 lg:w-2/3">
            <img
              src="/image-deportes.png"
              alt="imagen ilustrativa de deportes"
              className="w-full h-auto mt-4"
            />
          </div>
          <article className="text-center px-2 md:px-6 lg:px-12">
            <Paragraph textAlign='text-center'>
              Los clubes son el primer contacto que tienen los jóvenes con la práctica y la competencia en un deporte.
              Para fomentar estos espacios, se implementó el Programa de Becas Deportivas y Sociales, que apoya tanto
              a los clubes en sus actividades diarias como a los chicos que desean practicar un deporte, pero que no
              cuentan con los recursos suficientes.
            </Paragraph>
          </article>
          <article className="text-center mt-6">
            <PrimaryHeading>¡No te quedes fuera!</PrimaryHeading>
            <CircleButton rutaIcon="/futbol.svg" onClick={() => handleNavigation('/registrations')} text="Inscribite" />
          </article>
          <article className="w-full md:w-3/4 lg:w-1/2 text-center mt-6">
            <PrimaryHeading>¿Ya solicitaste una beca?</PrimaryHeading>
            <div className="mt-4">
              <Paragraph textAlign='text-center'>
                Si ya solicitaste una beca y deseas ver el estado de tu solicitud, inicia sesión y comprueba el estado de tu solicitud.
              </Paragraph>
            </div>
            <div className="mt-4">
              <Button onClick={() => handleNavigation('/user/login')} text={"INICIAR SESIÓN"} />
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
