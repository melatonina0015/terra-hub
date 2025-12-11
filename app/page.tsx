export const dynamic = 'force-dynamic';

import {db} from "@/lib/db";
import Link from "next/link";
import {getCompletedTodayTasks, getUrgentFeedingTasks} from "@/services/feeding-service";
import {FeedingItem} from "@/components/feeding-item";
import {FeedingTaskWithAnimal} from "@/types";

export default async function Home() {
    const animals = await db.animal.findMany();
    const urgentFeedingTasks = await getUrgentFeedingTasks();
    const completedTasks = await getCompletedTodayTasks();

    return (
        <main className="max-w-6xl mx-auto p-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold">Zadania na dziś ({urgentFeedingTasks.length})</h2>
                    {urgentFeedingTasks.length === 0 ? (
                        <p className="text-gray-500 italic space-y-4">Brak zaplanowanych karmień.</p>
                    ) : (
                        <ul className="my-4">
                            {urgentFeedingTasks.map((task: FeedingTaskWithAnimal) => (
                                <div key={task.id} className="grid grid-cols-[1fr_150px] items-center space-y-2">
                                    <FeedingItem task={task} animalId={task.animalId}/>
                                    <p className="ml-4 text-ellipsis">{task.animal.name}</p>
                                </div>
                            ))
                            }
                        </ul>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Zakończone zadania ({completedTasks.length})</h2>
                    {completedTasks.length === 0 ? (
                        <p className="text-gray-500 italic space-y-4">Brak zaplanowanych karmień.</p>
                    ) : (
                        <ul className="my-4">
                            {completedTasks.map((task: FeedingTaskWithAnimal) => (
                                <div key={task.id} className="grid grid-cols-[1fr_150px] items-center space-y-2">
                                    <FeedingItem task={task} animalId={task.animalId}/>
                                    <p className="ml-4 text-ellipsis">{task.animal.name}</p>
                                </div>
                            ))
                            }
                        </ul>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Twoje Zwierzaki ({animals.length})</h2>

                {animals.length === 0 ? (
                    <p className="text-gray-500 italic">Jeszcze pusto w terrariach...</p>
                ) : (
                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {animals.map((animal) => (
                            <Link href={`/animals/${animal.id}`} key={animal.id} className="block group">
                                <li key={animal.id}
                                    className="border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col items-start justify-between bg-white text-black">
                                    <div>
                                        <div className="font-bold text-lg">{animal.name}</div>
                                        <div className="text-sm text-gray-600">{animal.species}</div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Dodano: {animal.createdAt.toLocaleDateString()}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}
