import {db} from "@/lib/db";

type AnimalFormData = {
    name: string;
    species: string;
}

export const createAnimal = async (formData: AnimalFormData) => {
    return db.animal.create({data: formData})
}

export const getAnimalById = async (animalId: string) => {
    return db.animal.findUnique({
        where: {
            id: animalId
        },
        include: {
            feedings: {
                orderBy: {dueDate: "desc"}
            }
        }
    });
}