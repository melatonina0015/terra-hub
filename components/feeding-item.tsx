'use client'

import {toggleFeedingTaskAction} from "@/actions/feeding-action";

export const FeedingItem = ({task, animalId}) => {
    return (
        <li
            className={`p-3 rounded border flex justify-between items-center ${
                task.isDone ? "bg-gray-100 text-gray-400" : "bg-white"
            }`}
        >
            <span>{task.dueDate.toLocaleDateString()}</span>
            <span className="text-sm">
                    {task.isDone ? "Wykonane" : "Do zrobienia"}
            </span>
            <input type="checkbox" checked={task.isDone}
                   onChange={() => toggleFeedingTaskAction(task.id, !task.isDone, animalId)}/>
        </li>
    )
}