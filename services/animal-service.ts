import {db} from "@/lib/db";

type AnimalFormData = {
    name: string;
    species: string;
}

export const createAnimal = async (formData: AnimalFormData) => {
    const animal = await db.animal.create({ data: formData })

    console.log(animal)
}
