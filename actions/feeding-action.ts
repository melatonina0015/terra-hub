'use server'

import * as z from "zod";
import {createFeedingTask, toggleFeedingTask} from "@/services/feeding-service";
import {revalidatePath} from "next/cache";

const today = new Date();
today.setHours(0, 0, 0, 0);

export type FeedingState = {
    errors?: {
        animalId?: string[];
        dueDate?: string[];
        foodType?: string[];
        foodQuantity?: string[];
    };
    message?: string | null;
};

const feedingTaskValidation = z.object({
    animalId: z.string(),
    dueDate: z.coerce.date().min(today, {message: "Data musi być w przyszłości."}),
    foodType: z.string(),
    foodQuantity: z.preprocess((val) => (val === "" ? null : val),
        z.coerce.number().positive().int().nullable().optional()
    )
})

export const createFeedingTaskAction = async (prevState: FeedingState, formData: FormData) => {
    const rawFormData = {
        animalId: formData.get("animalId"),
        dueDate: formData.get("dueDate"),
        foodType: formData.get("foodType"),
        foodQuantity: formData.get("foodQuantity")
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