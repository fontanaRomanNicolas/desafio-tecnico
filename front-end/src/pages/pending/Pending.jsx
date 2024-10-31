import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { PrimaryHeading, CardRequestPending } from "../../components";
import useValidAdmin from "../../utils/validAdmin";
import useNavigateTo from "../../utils/fuctionNavigate";

export default function Pending() {

  useValidAdmin("/user/profile");

  const navigateTo = useNavigateTo();

  const [requests, setRequests] = useState([]);
  const { handleSubmit, register, reset } = useForm(); 

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:3000/api/application-statuses/pending");

      const result = await response.json();
      
      setRequests(result);
    };

    fetchRequests();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const onSubmit = async (data, requestId, requestState) => {
    const requestData = {
      comment: data.adminComment,
      state: requestState,
      id: requestId,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/application-statuses/update-state`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: `Solicitud ${requestData.state} correctamente.`,
        });

        navigateTo("/dashboard");
      } else if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the request!',
        });

        navigateTo("/dashboard/scholarships/pending");
        return;
      }

      const result = await response.json();
      console.log('Request updated:', result);
      reset();
    } catch (error) {
      console.error('Error updating request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'There was a problem with the network connection.',
      });
    }
  };

  return (
    <main className="p-4 flex justify-center items-center flex-col">
      <PrimaryHeading>Solicitudes Pendientes</PrimaryHeading>
      <article className="flex flex-wrap justify-around items-start gap-4 mt-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <section key={request.id} className="flex justify-start items-center min-w-[250px] flex-wrap bg-white shadow-md rounded-lg p-4 border"> {/* Se añadió un ancho mínimo */}
              <CardRequestPending
                request={request}
                onSubmit={onSubmit}
                onReject={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
              />
            </section>
          ))
        ) : (
          <p>No hay solicitudes pendientes.</p>
        )}
      </article>
    </main>
  );
}
