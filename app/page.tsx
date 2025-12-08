import {db} from "@/lib/db";
import Link from "next/link";

export default async function Home() {
    const animals = await db.animal.findMany();


    return (
        <main className="max-w-6xl mx-auto p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-emerald-700">Terra Hub 🦎</h1>

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
