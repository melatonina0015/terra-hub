import {getAnimalById} from "@/services/animal-service";
import {notFound} from "next/navigation";
import {FeedingForm} from "@/components/feeding-form";

type Props = {
    params: Promise<{
        animalId: string;
    }>;
};

export default async function AnimalPage({params}: Props) {
    const {animalId} = await params;

    const animal = await getAnimalById(animalId);

    if (!animal) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold text-emerald-800">{animal.name}</h1>
                <p className="text-xl text-gray-600">{animal.species}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                        <h2 className="font-bold text-lg mb-4">Zaplanuj posiłek</h2>
                        <FeedingForm animalId={animal.id}/>
                    </div>

                </div>

                <div>
                    <h2 className="font-bold text-lg mb-4">Historia Karmienia</h2>

                    {animal.feedings.length === 0 ? (
                        <p className="text-gray-500">Brak zaplanowanych karmień.</p>
                    ) : (
                        <ul className="space-y-3">
                            {animal.feedings.map((task) => (
                                <li
                                    key={task.id}
                                    className={`p-3 rounded border flex justify-between items-center ${
                                        task.isDone ? "bg-gray-100 text-gray-400" : "bg-white"
                                    }`}
                                >
                                    <span>{task.dueDate.toLocaleDateString()}</span>
                                    <span className="text-sm">
                    {task.isDone ? "Wykonane" : "Do zrobienia"}
                  </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}