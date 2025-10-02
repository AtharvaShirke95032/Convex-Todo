import {query,mutation} from "./_generated/server"

import { v } from "convex/values"

export const getTodos = query({
    args:{
        userId:v.string()
    },
    handler: async (ctx,{userId})=>{
        return await 
        ctx.db
        .query("todos")
        .filter((q)=>q.eq(q.field("ownerId"),userId))
        .collect()
    },
});


export const addTodo = mutation({
    args:{text: v.string(), category: v.string() ,ownerId:v.string()},
    handler: async (ctx,{text,category,ownerId})=>{
        const id = await ctx.db.insert("todos",{
            text,
            category,
            isCompleted:false,
            createdAt:Date.now(),
            ownerId,
        });
        return id;
    }
})

export const toggleTodo = mutation({
    args:{
        todoId:v.id("todos"),
        completed:v.boolean(),
    },
    handler :async(ctx,{todoId,completed})=>{
        return await ctx.db.patch(todoId, {isCompleted: completed});
    }
})

export const deleteTodo = mutation({
    args:{
        todoId:v.id("todos"),

    },
    handler:async(ctx,{todoId})=>{
        return await ctx.db.delete(todoId)
    }
})