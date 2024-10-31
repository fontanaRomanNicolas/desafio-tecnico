import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryHeading, SubHeading, Paragraph, Button } from "../../components";
import useNavigateTo from '../../utils/fuctionNavigate';

export default function Sport() {
    const { id } = useParams();
    const [sport, setSport] = useState(null);

    const navigateTo = useNavigateTo();

    useEffect(() => {
        const fetchSport = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sports/${id}`);
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                setSport(data);
            } catch (error) {
                console.error("Error fetching sport data:", error);
            }
        };

        fetchSport();
    }, [id]);

    return (
<div className="flex flex-col gap-8 p-6 max-w-screen-lg mx-auto">
    <article className="text-center">
        <PrimaryHeading>{sport?.name}</PrimaryHeading>
        <img src="/image-deportes.png" alt="Imagen de deportes" className="mt-6 mx-auto w-full max-w-md md:max-w-lg" />
    </article>
    
    <article className="bg-gray-50 p-6 rounded-lg shadow-md">
        <SubHeading className="text-xl md:text-2xl font-semibold">Descripción del deporte</SubHeading>
        <Paragraph margin="mt-4 mb-4" padding="p-0 md:pr-6" className="text-gray-700 leading-relaxed">
            {sport?.description}
        </Paragraph>
    </article>

    <article className="bg-gray-50 p-6 rounded-lg shadow-md">
        <SubHeading className="text-xl md:text-2xl font-semibold">Historia del deporte</SubHeading>
        <Paragraph margin="mt-4 mb-4" padding="p-0 md:pr-6" className="text-gray-700 leading-relaxed">
            {sport?.history}
        </Paragraph>
    </article>

    <div className="flex justify-center">
        <Button 
            onClick={() => navigateTo("/registrations")} 
            text={"IR A INSCRIBIRME"} 
            className="text-sm md:text-base font-semibold px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 w-full max-w-xs"
        />
    </div>
</div>

    );
};
