import {db} from "@/lib/db";

type FeedingTaskDTO = {
    dueDate: Date;
    animalId: string;
}

export const createFeedingTask = async (data: FeedingTaskDTO) => {
    return await db.feedingTask.create({data: data});
};