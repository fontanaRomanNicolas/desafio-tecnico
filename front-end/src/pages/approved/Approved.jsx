import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PrimaryHeading, CardRequestPending } from "../../components";
import useValidAdmin from "../../utils/validAdmin";

export default function Approved() {
  const [requests, setRequests] = useState([]);

  useValidAdmin("/user/profile");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/application-statuses/approved");

        const result = await response.json();

        setRequests(result);
        
      } catch (error) {
        console.error('Error fetching requests:', error);
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'There was a problem with the network connection.',
        });
      }
    };

    fetchRequests();
  }, []);


  return (
    <main className="p-4 flex justify-center items-center flex-col">
      <PrimaryHeading>Solicitudes Aprobadas</PrimaryHeading>
      <article className="flex flex-wrap justify-around items-start gap-4 mt-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <section key={request.id} className="flex justify-start items-center min-w-[250px] flex-wrap bg-white shadow-md rounded-lg p-4 border">
              <CardRequestPending request={request} />
            </section>
          ))
        ) : (
          <p>No hay solicitudes aprobadas.</p>
        )}
      </article>
    </main>


  );
}
