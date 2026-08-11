import { db, eq, user } from "@repo/db";

export class UserService {

    static async getMe(userId: string) {

        const [currentUser] = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                timezone: user.timezone,
            })
            .from(user)
            .where(eq(user.id, userId));

        if (!currentUser) {
            throw new Error("User not found");
        }

        return currentUser;
    }

    static async updateTimezone(userId: string, timezone: string) {
        const [updatedUser] = await db
            .update(user)
            .set({ timezone })
            .where(eq(user.id, userId))
            .returning({
                id: user.id,
                timezone: user.timezone,
            });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }

}