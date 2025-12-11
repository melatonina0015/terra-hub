'use client'

import {toggleFeedingTaskAction} from "@/actions/feeding-action";
import {startTransition, useOptimistic} from "react";
import {FeedingTask} from "@/types";

export const FeedingItem = ({task, animalId}: { task: FeedingTask, animalId: string }) => {
    const [optimisticToggle, addOptimisticToggle] = useOptimistic<FeedingTask, boolean>(
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

    const isTaskOverdue = () => {
        const today = (new Date()).setHours(0, 0, 0, 0);
        const taskDateObj = new Date(optimisticToggle.dueDate);
        const taskDate = taskDateObj.setHours(0, 0, 0, 0);

        return taskDate < today;
    }

    const isOverdue = isTaskOverdue() && !optimisticToggle.isDone;

    const liClassList = `p-3 rounded border flex justify-between items-center w-full ${
        optimisticToggle.isDone
            ? "bg-gray-100 text-gray-400"
            : isOverdue
                ? "border-red-500 bg-red-200"
                : "border"
    }`

    return (
        <li
            className={liClassList}
        >
            <span>{optimisticToggle.dueDate.toLocaleDateString()}</span>
            <div className="flex gap-2">
                <span>{optimisticToggle.foodQuantity} {optimisticToggle.foodType}</span>
            </div>
            <input type="checkbox" checked={optimisticToggle.isDone}
                   onChange={handleToggle}/>
        </li>
    )
}