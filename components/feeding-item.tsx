'use client'

import {toggleFeedingTaskAction} from "@/actions/feeding-action";
import {startTransition, useOptimistic} from "react";

export const FeedingItem = ({task, animalId}: { task: any, animalId: string }) => {
    const [optimisticToggle, addOptimisticToggle] = useOptimistic(
        task,
        (currState, newValue) => {
            return {...currState, isDone: newValue};
        }
    );

    const handleToggle = async () => {
        const newValue = !optimisticToggle.isDone;

        startTransition(() => {
            addOptimisticToggle(newValue);
        })

        await toggleFeedingTaskAction(task.id, newValue, animalId);
    }

    return (
        <li
            className={`p-3 rounded border flex justify-between items-center w-full ${
                optimisticToggle.isDone ? "bg-gray-100 text-gray-400" : "bg-white"
            }`}
        >
            <span>{optimisticToggle.dueDate.toLocaleDateString()}</span>
            <span className="text-sm">
                    {optimisticToggle.isDone ? "Wykonane" : "Do zrobienia"}
            </span>
            <input type="checkbox" checked={optimisticToggle.isDone}
                   onChange={handleToggle}/>
        </li>
    )
}