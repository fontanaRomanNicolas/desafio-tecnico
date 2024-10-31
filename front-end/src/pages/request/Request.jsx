import { PrimaryHeading, CardRequest } from '../../components';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../Context/UserContext';
import useValidUser from "../../utils/validUser";
import Swal from 'sweetalert2';

export default function Request() {

    useValidUser();

    const { user } = useUserContext();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/application-to-sport/${user.user?.id}`);

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong while fetching requests!',
                    });
                    return;
                }

                const result = await response.json();
                setRequests(result);

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while fetching requests!',
                });
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [user]);

    console.log(requests);

    return (
        <main className="max-w-4xl mx-auto p-4">
            <article className="flex flex-col items-center mb-8">
                <PrimaryHeading className="text-2xl font-bold">Requests</PrimaryHeading>
            </article>
            <div>
                {requests.length > 0 ? (
                    <ul className="list-none space-y-4">
                        {requests.map((request, index) => (
                            <li key={index} className="p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 ease-in-out">
                                <CardRequest request={request} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No requests available.</p>
                )}
            </div>
        </main>

    );
}
