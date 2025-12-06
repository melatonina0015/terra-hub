'use client'

import React, {useActionState} from 'react'
import {State} from "@/actions/animal-actions";
import {createFeedingTaskAction} from "@/actions/feeding-action";

type Props = {
    animalId: string;
}

export const FeedingForm = ({animalId}: Props) => {
    const initialState: State = {message: null, errors: {}};

    const [state, formAction] = useActionState(createFeedingTaskAction, initialState);

    return (
        <form action={formAction}>
            <div>
                <input
                    type="date"
                    name="dueDate"
                />
                {state.errors?.dueDate && (
                    <p>{state.errors.dueDate[0]}</p>
                )}
            </div>
            <input
                type="text"
                name="animalId"
                hidden
                readOnly
                value={animalId}/>

            <button>Dodaj karmienie</button>
        </form>
    )
}
export default FeedingForm
