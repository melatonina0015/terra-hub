'use server'

import * as z from "zod";
import {createFeedingTask, toggleFeedingTask} from "@/services/feeding-service";
import {revalidatePath} from "next/cache";
import {State} from "@/actions/animal-actions";

const today = new Date();
today.setHours(0, 0, 0, 0);

const feedingTaskValidation = z.object({
    animalId: z.string(),
    dueDate: z.coerce.date().min(today, {message: "Data musi być w przyszłości."})
})

export const createFeedingTaskAction = async (prevState: State, formData: FormData) => {
    const rawFormData = {
        animalId: formData.get("animalId"),
        dueDate: formData.get("dueDate")
    }

    const validationResult = feedingTaskValidation.safeParse(rawFormData);

    if (!validationResult.success) {
        return {
            errors: z.flattenError(validationResult.error).fieldErrors,
            message: "Błąd walidacji. Sprawdź pola.",
        };
    }

    try {
        await createFeedingTask(validationResult.data);

        revalidatePath("/");

        return {message: "Dodano zadanie!", errors: {}};
    } catch (e) {
        return {message: "Błąd bazy danych."};
    }
}

export const toggleFeedingTaskAction = async (feedingTaskId: string, isDone: boolean, animalId: string) => {
    await toggleFeedingTask(feedingTaskId, isDone);
    revalidatePath(`/animals/${animalId}`);
}