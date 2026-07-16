import { z } from "zod";

export const RouteSchema = z.enum([
    "chat",
    "new_task",
    "continue_task",
    "cancel_task",
]);

export const RouterResultSchema = z.object({
    route: RouteSchema,
    reason: z.string(),
});

export type RouterResult = z.infer<typeof RouterResultSchema>;