"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./todo-form";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { deleteTodo, toggleTodo } from "@/convex/todos";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";

export const Greed = ({ selectedDate }: { selectedDate?: Date }) => {
  if (!selectedDate) return null;

  const [open, setOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState<Date | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const { userId } = useAuth();

  const monthStart = new Date(year, month, 1);
  monthStart.setHours(0, 0, 0, 0);
  const monthEnd = new Date(year, month, daysInMonth);
  monthEnd.setHours(23, 59, 59, 999);

  const todos = useQuery(
    api.todos.getTodos,
    userId
      ? { userId, monthStart: monthStart.getTime(), monthEnd: monthEnd.getTime() }
      : "skip"
  );
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const handleDayClick = (day: number) => {
    setClickedDay(new Date(year, month, day));
    setOpen(true);
  };

  return (
    <>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`pad-${idx}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const cellDate = new Date(year, month, day);
          cellDate.setHours(0, 0, 0, 0);
          const cellTimestamp = cellDate.getTime();

          const dayTodo = todos?.filter((todo) => todo.date === cellTimestamp) || [];

          const isToday =
            new Date().getDate() === day &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year;

          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded-lg p-2 transition relative cursor-pointer ${isToday
                ? "bg-secondary "
                : "bg-muted/30 hover:bg-muted"
                }`}
            >
              <div className="absolute top-2 right-2 text-xs font-semibold bg-primary-foreground w-6 h-6 flex items-center justify-center rounded-full">
                {day}
              </div>
              

              <div className="mt-6 space-y-1 text-xs overflow-hidden">
                <ul className="list-disc list-inside">
                  {dayTodo.slice(0,3).map((todo) => (
                    <li
                      key={todo._id}
                      className={todo.isCompleted ? "line-through text-gray-400" : ""}
                    >
                      {todo.text}
                    </li>
                  ))}
                </ul>
                {dayTodo.length > 3 && (
                  <div className="text-gray-500 truncate">+{dayTodo.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {clickedDay?.toDateString() || "Add Todo"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 flex-wrap cursor-pointer">
            {clickedDay &&
              todos
                ?.filter((todo) => todo.date === clickedDay.setHours(0, 0, 0, 0))
                .map((todo) => (
                  <ContextMenu key={todo._id}>
                    <ContextMenuTrigger asChild>

                      <button
                        onClick={() =>
                          toggleTodo({
                            todoId: todo._id,
                            completed: !todo.isCompleted,
                          })
                        }
                        className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer text-sm sm:text-base ${todo.isCompleted
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

          <TodoForm day={clickedDay} />
        </DialogContent>
      </Dialog>
    </>
  );
};