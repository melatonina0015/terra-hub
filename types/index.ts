import {Prisma} from "@prisma/client";

export type {Animal, FeedingTask} from "@prisma/client";

export type FeedingTaskWithAnimal = Prisma.FeedingTaskGetPayload<{
    include: { animal: true }
}>;

export type AnimalWithFeedings = Prisma.AnimalGetPayload<{
    include: { feedings: true }
}>;