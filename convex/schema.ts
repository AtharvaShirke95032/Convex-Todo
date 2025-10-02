import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    proUser: v.boolean(),
    clerkId: v.string(),
  }),
  todos: defineTable({
    text: v.string(),
    category: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    ownerId: v.string(),
  }),
});