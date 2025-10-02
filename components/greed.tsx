"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TodoForm from "./todo-form";

export const Greed = ({ selectedDate }: { selectedDate?: Date }) => {
  if (!selectedDate) return null;

  const [open, setOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState<Date | null>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    setClickedDay(new Date(year, month, day));
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-2 w-full">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`pad-${idx}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
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
              <div className="absolute top-2 right-2 text-xs font-semibold">
                {day}
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
          <TodoForm />
        </DialogContent>
      </Dialog>
    </>
  );
};