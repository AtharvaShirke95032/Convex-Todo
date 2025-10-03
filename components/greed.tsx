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
import { useQuery } from "convex/react";

export const Greed = ({ selectedDate }: { selectedDate?: Date }) => {
  if (!selectedDate) return null;

  const [open, setOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState<Date | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const { userId } = useAuth();
  if (!userId) return null;

  const monthStart = new Date(year, month, 1);
  monthStart.setHours(0, 0, 0, 0);
  const monthEnd = new Date(year, month, daysInMonth);
  monthEnd.setHours(23, 59, 59, 999);

  const todos = useQuery(
    api.todos.getTodos,
    { userId, monthStart: monthStart.getTime(), monthEnd: monthEnd.getTime() }
  );

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
              className={`aspect-square rounded-lg p-2 transition relative cursor-pointer ${
                isToday
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted/30 hover:bg-muted"
              }`}
            >
              <div className="absolute top-2 right-2 text-xs font-semibold bg-amber-300 w-6 h-6 flex items-center justify-center rounded-full">
                {day}
              </div>

              <div className="mt-6 space-y-1 text-xs overflow-hidden">
                {dayTodo.slice(0, 3).map((todo) => (
                  <div key={todo._id} className="truncate">
                    • {todo.text}
                  </div>
                ))}
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

          <div className="space-y-2 mb-4">
            {clickedDay &&
              todos
                ?.filter((todo) => todo.date === clickedDay.setHours(0, 0, 0, 0))
                .map((todo) => (
                  <div
                    key={todo._id}
                    className="px-2 py-1 bg-muted rounded-md flex justify-between items-center"
                  >
                    <span>{todo.text}</span>
                  </div>
                ))}
          </div>

          <TodoForm day={clickedDay} />
        </DialogContent>
      </Dialog>
    </>
  );
};