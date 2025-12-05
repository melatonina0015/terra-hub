'use client'

import { createAnimalAction, State } from "@/actions/animal-actions";
import {useActionState} from "react";

export function AnimalForm() {
    const initialState: State = { message: null, errors: {} };

    const [state, formAction] = useActionState(createAnimalAction, initialState);

    return (
        <form action={formAction} className="flex gap-4 flex-col md:flex-row items-start">
            <div className="flex-1 w-full">
                <input
                    name="name"
                    type="text"
                    placeholder="Imię (np. Shrek)"
                    className="border p-2 rounded w-full text-black"
                />
                {state.errors?.name && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
                )}
            </div>

            <div className="flex-1 w-full">
                <input
                    name="species"
                    type="text"
                    placeholder="Gatunek (np. Ogr)"
                    className="border p-2 rounded w-full text-black"
                />
                {state.errors?.species && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.species[0]}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition-colors"
            >
                Dodaj
            </button>
        </form>
    );
}