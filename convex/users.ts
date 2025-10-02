import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    proUser: v.boolean(),
  },
  handler: async (ctx, { clerkId, username, firstName, lastName, proUser }) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"),clerkId))
      .first()
      

    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      clerkId,
      username,
      firstName,
      lastName,
      proUser,
    });
  },
});