import Sports from "../../../models/SportsModel.js";

export const updateSportQuerie = async (id ,name, type_of_sport, description, history) => {
    try{
        const sport = await Sports.findOne({
            where: { id },
        });

        if (!sport) {
            return { status: 400, error: 'El deporte no se encuentra registrado' };
        }

        const newSport = await Sports.update({
            name,
            type_of_sport: type_of_sport.value,
            description,
            history
        }, {
            where: { id }
        });

        return { status: 201, newSport };
    }catch (error){
        throw new Error('Error al actualizar el deporte', error);
        console.log(error);
    }
};