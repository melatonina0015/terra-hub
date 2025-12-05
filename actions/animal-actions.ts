'use server'

import {createAnimal} from "@/services/animal-service";
import * as z from "zod";
import {revalidatePath} from "next/cache";

export type State = {
    errors?: {
        name?: string[];
        species?: string[];
    };
    message?: string | null;
};

const FormDataValidation = z.object({
    name: z.string().min(3, ),
    species: z.string().min(3)
})

export const createAnimalAction = async (prevState: State, formData: FormData) : Promise<State> => {
    const rawFormData = {
        name: formData.get("name"),
        species: formData.get("species")
    }

    const validationResult = FormDataValidation.safeParse(rawFormData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
            message: "Błąd walidacji. Sprawdź pola.",
        };
    }

    try {
        await createAnimal(validationResult.data);
        revalidatePath("/");
        return { message: "Dodano zwierzę!", errors: {} };
    } catch (e) {
        return { message: "Błąd bazy danych." };
    }
};