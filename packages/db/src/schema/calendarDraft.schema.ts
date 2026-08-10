import { z } from "zod";

export const CalendarDraftSchema = z.object({
    title: z.string(),
    endTime: z.string(),
});

export type CalendarDraft = z.infer<typeof CalendarDraftSchema>;