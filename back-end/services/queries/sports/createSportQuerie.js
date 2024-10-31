import Sports from "../../../models/SportsModel.js";

export const createSportQuerie = async (name, type_of_sport, description, history) => {
    try{
        const sport = await Sports.findOne({
            where: { name },
        });

        if (sport) {
            return { status: 400, error: 'El deporte ya existe' };
        }

        const newSport = await Sports.create({
            name,
            type_of_sport: type_of_sport.value,
            description,
            history,
            state: 'active',
        });

        return { status: 201, newSport };
    }catch (error){
        throw new Error('Error al crear el deporte', error);
        console.log(error);
    }
};