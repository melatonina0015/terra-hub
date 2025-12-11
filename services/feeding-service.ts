import {db} from "@/lib/db";

type FeedingTaskDTO = {
    dueDate: Date;
    animalId: string;
    foodType?: string;
    foodQuantity?: number | null;
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

export const getUrgentFeedingTasks = async () => {
    return db.feedingTask.findMany({
        where: {
            dueDate: {
                lte: new Date()
            },
            isDone: false
        },
        include: {
            animal: true
        },
        orderBy: {
            dueDate: "asc"
        }
    })
}

export const getCompletedTodayTasks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return db.feedingTask.findMany({
        where: {
            updatedAt: {
                gte: today,
            },
            isDone: true
        },
        include: {
            animal: true
        },
        orderBy: {
            updatedAt: "desc"
        }
    })
}