'use client'

import React, {useActionState} from 'react'
import {createFeedingTaskAction, FeedingState} from "@/actions/feeding-action";

type Props = {
    animalId: string;
}

export const FeedingForm = ({animalId}: Props) => {
    const initialState: FeedingState = {message: null, errors: {}};

    const [state, formAction] = useActionState(createFeedingTaskAction, initialState);

    return (
        <form action={formAction}>
            <div className="mb-4">
                <input
                    type="date"
                    name="dueDate"
                    className="border rounded w-full text-black px-1"
                    defaultValue={new Date().toISOString().split('T')[0]}
                />
                {state.errors?.dueDate && (
                    <p className="text-sm text-red-600">{state.errors.dueDate[0]}</p>
                )}
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="foodQuantity"
                        className="border rounded w-full text-black px-1"
                        placeholder="Ilość"
                    />
                    {state.errors?.foodQuantity && (
                        <p className="text-sm text-red-600">{state.errors.foodQuantity[0]}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="foodType"
                        className="border rounded w-full text-black px-1"
                        placeholder="Rodzaj"
                    />
                </div>
            </div>

            <input
                type="text"
                name="animalId"
                hidden
                readOnly
                value={animalId}/>

            <button
                className="bg-leaf-green hover:bg-grassy-green transition-colors text-white px-2 py-1 w-full rounded-md">Dodaj
                karmienie
            </button>
        </form>
    )
}
export default FeedingForm
