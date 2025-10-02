"use client";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const SeeTodo = () => {
  const { userId } = useAuth();
  const todos = useQuery(api.todos.getTodos, userId ? { userId } : "skip");
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  if (!todos) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Your Todos
      </h1>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center sm:text-left">
          No todos yet. Add some above!
        </p>
      )}

      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {todos.map((todo) => (
          <ContextMenu key={todo._id}>
            <ContextMenuTrigger asChild>
              <button
                onClick={() =>
                  toggleTodo({
                    todoId: todo._id,
                    completed: !todo.isCompleted,
                  })
                }
                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer text-sm sm:text-base ${
                  todo.isCompleted
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
              >
                {todo.text} ({todo.category})
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                variant="destructive"
                onClick={() => deleteTodo({ todoId: todo._id })}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
};

export default SeeTodo;