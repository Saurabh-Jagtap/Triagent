import { z } from "zod";

export const ChatResultSchema = z.object({
    reply: z.string(),
});

export type ChatResult = z.infer<typeof ChatResultSchema>;