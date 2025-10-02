"use client"
import React from 'react'
import { Calendar } from "@/components/ui/calendar"
type CalProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export const Cal = ({ date, setDate }: CalProps) => {

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
}
