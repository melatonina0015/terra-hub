import {db} from "@/lib/db";
import {AnimalForm} from "@/components/animal-form";
import FeedingForm from "@/components/feeding-form";
import Link from "next/link";

export default async function Home() {
    const animals = await db.animal.findMany();


    return (
        <main className="max-w-4xl mx-auto p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-emerald-700">Terra Hub 🦎</h1>

            {/* 2. FORMULARZ DODAWANIA (Server Action) */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Dodaj nowego podopiecznego</h2>
                <AnimalForm/>
            </div>

            {/* 3. LISTA ZWIERZĄT */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Twoje Zwierzaki ({animals.length})</h2>

                {animals.length === 0 ? (
                    <p className="text-gray-500 italic">Jeszcze pusto w terrariach...</p>
                ) : (
                    <ul className="grid gap-4">
                        {animals.map((animal) => (
                            <Link href={`/animals/${animal.id}`} key={animal.id} className="block group">
                                <li key={animal.id}
                                    className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center bg-white text-black">
                                    <div>
                                        <div className="font-bold text-lg">{animal.name}</div>
                                        <div className="text-sm text-gray-600">{animal.species}</div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Dodano: {animal.createdAt.toLocaleDateString()}
                                    </div>
                                    <div>
                                        <FeedingForm animalId={animal.id}/>
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
