import { adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { users, subscriptionCancellations, winbackEmails } from "../drizzle/schema";
import { and, isNull, lte, gte, eq } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { sendWinbackEmail } from "./_core/email";



export const winbackRouter = router({
    processPendingEmails: adminProcedure
        .mutation(async () => {
            const db = await getDb();
            if (!db) {
                await notifyOwner({
                    title: "Win-back Email Failure: Database Connection",
                    content: "Failed to process pending win-back emails because the database is not available.",
                });
                return { success: false, message: "Database not available" };
            }

            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            let emailsSent = 0;
            let errors: string[] = [];

            try {
                // Fetch users who cancelled 7 days ago and haven't received a 7-day email
                const sevenDayCancellations = await db.select()
                    .from(subscriptionCancellations)
                    .leftJoin(winbackEmails, and(
                        eq(winbackEmails.userId, subscriptionCancellations.userId),
                        eq(winbackEmails.type, '7-day')
                    ))
                    .where(and(
                        lte(subscriptionCancellations.cancelledAt, sevenDaysAgo),
                        gte(subscriptionCancellations.cancelledAt, new Date(sevenDaysAgo.getTime() - 24 * 60 * 60 * 1000)), // 1 day window
                        isNull(winbackEmails.id)
                    ));

                for (const cancellation of sevenDayCancellations) {
                    const userResult = await db.select().from(users).where(eq(users.id, cancellation.subscription_cancellations.userId));
                    const user = userResult[0];
                    if (user) {
                        const success = await sendWinbackEmail(user.email!, '7-day');
                        if (success) {
                            await db.insert(winbackEmails).values({
                                userId: user.id,
                                type: '7-day',
                                sentAt: new Date(),
                            });
                            emailsSent++;
                        } else {
                            errors.push(`Failed to send 7-day win-back email to user ${user.id}`);
                        }
                    }
                }

                // Fetch users who cancelled 30 days ago and haven't received a 30-day email
                const thirtyDayCancellations = await db.select()
                    .from(subscriptionCancellations)
                    .leftJoin(winbackEmails, and(
                        eq(winbackEmails.userId, subscriptionCancellations.userId),
                        eq(winbackEmails.type, '30-day')
                    ))
                    .where(and(
                        lte(subscriptionCancellations.cancelledAt, thirtyDaysAgo),
                        gte(subscriptionCancellations.cancelledAt, new Date(thirtyDaysAgo.getTime() - 24 * 60 * 60 * 1000)), // 1 day window
                        isNull(winbackEmails.id)
                    ));

                for (const cancellation of thirtyDayCancellations) {
                    const userResult = await db.select().from(users).where(eq(users.id, cancellation.subscription_cancellations.userId));
                    const user = userResult[0];
                    if (user) {
                        const success = await sendWinbackEmail(user.email!, '30-day');
                        if (success) {
                            await db.insert(winbackEmails).values({
                                userId: user.id,
                                type: '30-day',
                                sentAt: new Date(),
                            });
                            emailsSent++;
                        } else {
                            errors.push(`Failed to send 30-day win-back email to user ${user.id}`);
                        }
                    }
                }

                if (errors.length > 0) {
                    await notifyOwner({
                        title: "Win-back Email Sending Errors",
                        content: `Failed to send ${errors.length} win-back emails. Errors: ${errors.join(", ")}`,
                    });
                }

                return { success: true, emailsSent, errors };

            } catch (error: any) {
                await notifyOwner({
                    title: "Win-back Email Failure: Unhandled Exception",
                    content: `An unexpected error occurred while processing win-back emails: ${error.message}`,
                });
                return { success: false, message: error.message };
            }
        }),
});
