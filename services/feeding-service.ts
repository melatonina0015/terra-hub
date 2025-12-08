import {db} from "@/lib/db";

type FeedingTaskDTO = {
    dueDate: Date;
    animalId: string;
}

export const createFeedingTask = async (data: FeedingTaskDTO) => {
    return db.feedingTask.create({data: data});
};

export const toggleFeedingTask = async (feedingTaskId: string, isDone: boolean) => {
    return db.feedingTask.update({
        where: {id: feedingTaskId},
        data: {isDone: isDone}
    })
}